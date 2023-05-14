import Vue, { PluginObject } from 'vue';
import Vuetify from 'vuetify';

// rewrite `DATABASE_URL` for prisma client
// make it visible in the app
// @ts-ignore
process.env.DATABASE_URL = global.DB_TEST_URL;

const i18nMock = function (key: string, _opts: any) {
  return key;
};

const i18nMockPlugin: PluginObject<Vue> = {
  // called by Vue.use(FirstPlugin)
  install(Vue) {
    Vue.prototype.$t = i18nMock;
    Vue.prototype.$tc = i18nMock;
    // eslint-disable-next-line no-console
    Vue.prototype.showSnackbar = console.log;
  },
};

Vue.use(Vuetify);
Vue.use(i18nMockPlugin); // mock i18n
