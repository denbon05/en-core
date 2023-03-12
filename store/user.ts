import { GetterTree, MutationTree } from 'vuex';
import { UserData } from '@/types/auth/person';
import { UserState } from '@/types/store';

const defaultData: UserData = {
  email: '',
  firstName: '',
  lastName: '',
  id: null,
  role: null,
  calendarId: null,
};

export const state = (): UserState => ({
  data: defaultData,
});

export const getters: GetterTree<UserState, UserState> = {
  isAuthenticated({ data: { email } }): boolean {
    return Boolean(email);
  },

  isGoogleCalendarSynced({ data: { calendarId } }) {
    return Boolean(calendarId);
  },

  isGuest({ data: { role } }) {
    return !role;
  },

  isStudent({ data: { role } }) {
    return role?.name === 'student';
  },

  isTutor({ data: { role } }) {
    return role?.name === 'tutor';
  },

  isAdmin({ data: { role } }) {
    return role?.name === 'admin';
  },

  isSuperAdmin({ data: { role } }) {
    return role?.name === 'superadmin';
  },

  isAdminAndUp({ data: { role = {} } }) {
    return role.name === 'admin' || role.name === 'superadmin';
  },
};

export const mutations: MutationTree<UserState> = {
  setUser(state, userData: UserData) {
    state.data = userData || defaultData;
  },
};
