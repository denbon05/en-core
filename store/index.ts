import { ActionTree } from 'vuex';
import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import type { RootState } from '@/types/store';

export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit({ dispatch }) {
    const jwtToken: string = this.$cookies.get('auth');

    try {
      const { email } = jwtDecode(jwtToken) || {};

      if (jwtToken && email) {
        dispatch('auth/refresh', { email, jwtToken });
      }
    } catch (err) {
      if (!(err instanceof InvalidTokenError)) {
        throw err;
      }
    }
  },
};
