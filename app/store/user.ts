import { Role } from '@prisma/client';
import debug from 'debug';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { ApiParams } from '@/types/api';
import { UserDataOrNull } from '@/types/api/user';
import { UserState } from '@/types/store';

const log = debug('app:store:user');

const defaultData: UserDataOrNull = {
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

  userId({ data: { id } }): number {
    return id;
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
  setUser(state, userData: UserDataOrNull) {
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
    { lastName, firstName }: ApiParams<'v1/user/data/update'>
  ) {
    try {
      const res = await this.$api('v1/user/data/update', {
        lastName,
        firstName,
      });

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
