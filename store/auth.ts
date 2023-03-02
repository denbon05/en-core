import { ActionTree, GetterTree, MutationTree } from 'vuex';
import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import { ApiParams } from '@/types/api';
import { AuthState } from '@/types/store';

export const state = (): AuthState => ({
  accessToken: '',
});

export const getters: GetterTree<AuthState, AuthState> = {
  isAuthenticated(): boolean {
    const jwt: string = this.$cookies.get('auth');

    try {
      const jwtDecoded = jwtDecode(jwt);
      return Boolean(jwtDecoded.email);
    } catch (err) {
      if (!(err instanceof InvalidTokenError)) {
        throw err;
      }
      return false;
    }
  },
};

export const mutations: MutationTree<AuthState> = {
  setToken(state, accessToken: string) {
    state.accessToken = accessToken;
    this.$cookies.set('auth', accessToken);
  },

  removeToken(state) {
    state.accessToken = '';
    this.$cookies.remove('auth');
  },
};

export const actions: ActionTree<AuthState, AuthState> = {
  async logIn({ commit }, { email, password }: ApiParams<'auth/login'>) {
    const { accessToken, isSuccess, message } = await this.$api('auth/login', {
      email,
      password,
    });

    if (isSuccess) {
      commit('setToken', accessToken);
      commit('user/setUser', { email }, { root: true });
    }

    return { isSuccess, message };
  },

  refresh(
    { commit },
    { email, jwtToken }: { email: string; jwtToken: string }
  ) {
    commit('user/setUser', { email }, { root: true });
    commit('setToken', jwtToken);
  },

  logOut({ commit }) {
    commit('removeToken');
  },
};
