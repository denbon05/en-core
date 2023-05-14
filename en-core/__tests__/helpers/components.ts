import { createLocalVue, MountOptions } from '@vue/test-utils';
import Vuex from 'vuex';
// import

const localVue = createLocalVue();

localVue.use(Vuex);

// const store = new Vuex.Store<any>({
//   getters: {
//     user: {
//       isAuthenticated: false,
//     },
//   },
// });

export const defaultMountOptions: MountOptions<Vue> = {
  localVue,
};
