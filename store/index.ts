import { ActionTree } from 'vuex';
import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import type { RootState } from '@/types/store';

export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit({ dispatch }) {
    const jwtToken: string = this.$cookies.get('auth');

    try {
      const userData = jwtDecode(jwtToken);

      if (jwtToken && userData.email) {
        dispatch('auth/refresh', { jwtToken, userData });
      }
    } catch (err) {
      if (!(err instanceof InvalidTokenError)) {
        throw err;
      }
    }
  },
};
