import { ApiParams } from '@/types/api';
import { UserData } from '@/types/auth/person';
import { AuthState } from '@/types/store';
import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import { ActionTree, GetterTree, MutationTree } from 'vuex';

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
    const res = await this.$api('auth/login', {
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
    { email, password, firstName, lastName }: ApiParams<'auth/signup'>
  ) {
    const res = await this.$api('auth/signup', {
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
    { userData, jwtToken }: { userData: UserData; jwtToken: string }
  ) {
    commit('user/setUser', userData, { root: true });
    commit('setToken', jwtToken);
  },

  logOut({ commit }) {
    commit('removeToken');
    commit('user/setUser', null, { root: true });
  },
};
