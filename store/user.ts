import { GetterTree, MutationTree } from 'vuex';
import { User, Guest, AppStorage } from '@/entities';
import { ApiParams } from '@/types/api';
import { UserState } from '@/types/store';

export const state = (): UserState => ({
  instance: new Guest(),
});

export const getters: GetterTree<UserState, UserState> = {
  isAuthenticated({ instance }) {
    return !instance.isGuest();
  },

  isGoogleCalendarSynced() {
    return Boolean(AppStorage.getItem('calendarId'));
  },
};

export const mutations: MutationTree<UserState> = {
  setUser(
    state,
    { email }: Partial<Pick<ApiParams<'auth/login'>, 'email'>> = {}
  ) {
    if (email) {
      state.instance = new User({ email });
      return;
    }
    state.instance = new Guest();
  },
};
