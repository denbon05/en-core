import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { ApiParams } from '@/types/api';
import type { UserDataOrNull } from '@/types/api/user';
import type { AuthState } from '@/types/store';

export const state = (): AuthState => ({
  accessToken: '',
});

export const getters: GetterTree<AuthState, AuthState> = {
  isAuthenticated(): boolean {
    const jwt: string = (this.$cookies as any).get('auth');

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
    (this.$cookies as any).set('auth', accessToken);
  },

  removeToken(state) {
    state.accessToken = '';
    (this.$cookies as any).remove('auth');
  },
};

export const actions: ActionTree<AuthState, AuthState> = {
  async logIn({ commit }, { email, password }: ApiParams<'user/auth/signup'>) {
    const res = await this.$api('user/auth/login', {
      email,
      password,
    });

    if (typeof res === 'string') {
      return {
        isSuccess: false,
        message: res,
      };
    }

    const { accessToken, isSuccess, message, userData } = res;

    if (isSuccess) {
      commit('setToken', accessToken);
      commit('user/setUser', userData, { root: true });
    }

    return { isSuccess, message };
  },

  async signUp(
    { commit },
    { email, password, firstName, lastName }: ApiParams<'user/auth/signup'>
  ) {
    const res = await this.$api('user/auth/signup', {
      email,
      password,
      firstName,
      lastName,
    });

    if (typeof res === 'string') {
      return { isSuccess: false, message: res };
    }

    const { accessToken, isSuccess, message, userData } = res;

    if (isSuccess) {
      commit('setToken', accessToken);
      commit('user/setUser', userData, { root: true });
    }

    return { isSuccess, message };
  },

  refresh(
    { commit },
    { userData, jwtToken }: { userData: UserDataOrNull; jwtToken: string }
  ) {
    commit('user/setUser', userData, { root: true });
    commit('setToken', jwtToken);
  },

  logOut({ commit }) {
    commit('removeToken');
    commit('user/setUser', null, { root: true });
  },
};
