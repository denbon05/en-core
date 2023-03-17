import { GetterTree, MutationTree, ActionTree } from 'vuex';
import debug from 'debug';
import { UserState } from '@/types/store';
import { ApiParams } from '@/types/api';
import { UserData } from '@/types/api/user';

const log = debug('app:store:user');

const defaultData: UserData = {
  email: '',
  firstName: '',
  lastName: '',
  id: null,
  role: null,
};

export const state = (): UserState => ({
  data: defaultData,
});

export const getters: GetterTree<UserState, UserState> = {
  data({
    data: {
      email,
      firstName,
      lastName,
      role: { name },
    },
  }) {
    const userData = { email, firstName, lastName, roleName: null };
    if (name === 'admin' || name === 'superadmin') {
      userData.roleName = name;
    }
    return userData;
  },

  isAuthenticated({ data: { email } }): boolean {
    return Boolean(email);
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
    if (!userData) {
      state.data = defaultData;
      return;
    }

    state.data = { ...state.data, ...userData };
  },
};

export const actions: ActionTree<UserState, UserState> = {
  async updateData(
    { commit },
    { lastName, firstName }: ApiParams<'user/data/update'>
  ) {
    try {
      const res = await this.$api('user/data/update', { lastName, firstName });

      if (typeof res === 'string') {
        throw new TypeError(res);
      }

      const { isSuccess, message } = res;

      if (isSuccess) {
        commit('setUser', { lastName, firstName });
      }

      return { isSuccess, message };
    } catch (err) {
      log('updateData err', err);
      return {
        isSuccess: false,
        message: err.message,
      };
    }
  },
};
