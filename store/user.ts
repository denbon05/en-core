import { GetterTree, MutationTree, ActionTree } from 'vuex';
import debug from 'debug';
import { Role } from '@prisma/client';
import { UserState } from '@/types/store';
import { ApiParams } from '@/types/api';
import { UserData } from '@/types/api/user';

const log = debug('app:store:user');

const defaultData: UserData = {
  email: '',
  firstName: '',
  lastName: '',
  id: 0,
  role: null,
};

export const state = (): UserState => ({
  data: defaultData,
});

export const getters: GetterTree<UserState, UserState> = {
  data({ data: { email, firstName, lastName, role } }) {
    const userData = { email, firstName, lastName, roleName: '' };
    if (!role) {
      return userData;
    }
    const { name } = role;
    if (name === Role.ADMIN || name === Role.SUPERADMIN) {
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
    return role?.name === Role.STUDENT;
  },

  isTutor({ data: { role } }) {
    return role?.name === Role.TUTOR;
  },

  isAdmin({ data: { role } }) {
    return role?.name === Role.ADMIN;
  },

  isSuperAdmin({ data: { role } }) {
    return role?.name === Role.SUPERADMIN;
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
