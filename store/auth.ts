import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { Guest, User, AppStorage } from '@/entities';
import { ApiParams } from '@/types/api';
import { AuthState } from '@/types/auth/state';
import { IStorage } from '@/types/api/app-storage';

export const state = (): AuthState => ({
  accessToken: '',
  refreshToken: '',
  user: AppStorage.getItem('auth') ? new User() : new Guest(),
});

export const getters: GetterTree<AuthState, AuthState> = {
  isAuthenticated({ user }) {
    return !user.isGuest();
  },
};

export const mutations: MutationTree<AuthState> = {
  setTokens(state, { accessToken, refreshToken }: IStorage['auth']) {
    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
    AppStorage.setItem('auth', { accessToken, refreshToken });
  },
  removeTokens(state) {
    state.accessToken = '';
    state.refreshToken = '';
    AppStorage.removeItem('auth');
  },
};

export const actions: ActionTree<AuthState, AuthState> = {
  async logIn({ commit }, { email, password }: ApiParams<'auth/login'>) {
    const { accessToken, isSuccess, message } = await this.$api('auth/login', {
      email,
      password,
    });

    if (!isSuccess) {
      // ? handle above
      throw new Error(message);
    }

    commit('setTokens', accessToken);
  },

  logOut({ commit }) {
    commit('removeTokens');
  },

  // async refresh({ state, commit }) {
  //   const res = await this.$api('auth/refresh', {
  //     refreshToken: state.refreshToken,
  //   });

  //   commit('setTokens', res);
  // },
};
