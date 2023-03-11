import { GetterTree, MutationTree } from 'vuex';
import { User, Guest } from '@/entities';
import { UserState } from '@/types/store';
import { IUserData } from '@/types/auth/person';

export const state = (): UserState => ({
  instance: new Guest(),
});

export const getters: GetterTree<UserState, UserState> = {
  isAuthenticated({ instance }) {
    return !instance.isGuest();
  },

  isGoogleCalendarSynced({ instance }) {
    if (instance.isGuest()) {
      return false;
    }

    return (instance as User).has('user.calendarId');
  },
};

export const mutations: MutationTree<UserState> = {
  setUser(state, userData: IUserData) {
    if (userData) {
      state.instance = new User(userData);
      return;
    }
    state.instance = new Guest();
  },
};
