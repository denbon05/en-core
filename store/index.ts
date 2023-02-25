import { ActionTree } from 'vuex';

export const state = () => ({});

export type RootState = typeof state;

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit, dispatch }) {
    try {
      await dispatch('auth/refresh');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('nuxtServerInit', e);
      commit('auth/logout');
    }
  },
};
