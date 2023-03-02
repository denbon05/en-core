import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { Guest, User, AppStorage } from '@/entities';
import { ApiParams } from '@/types/api';
import { IStorage } from '@/types/api/app-storage';
import { GoogleState } from '@/types/store';

export const state = (): GoogleState => ({
  calendarId: '',
});

export const getters: GetterTree<GoogleState, GoogleState> = {
  calendarId(): string | null {
    return AppStorage.getItem('calendarId');
  },
};

export const mutations: MutationTree<GoogleState> = {
  setCalendarId(state, { calendarId }: Pick<IStorage, 'calendarId'>) {
    state.calendarId = calendarId;
    AppStorage.setItem('calendarId', calendarId);
  },
};

// export const actions: ActionTree<GoogleState, GoogleState> = {
//   async getCalendarList({ commit }) {
//     await this.$api('google/calendar/list')
//   },
// };
