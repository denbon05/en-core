import Vue, { PluginObject } from 'vue';
import Vuetify from 'vuetify';

const i18nMockPlugin: PluginObject<Vue> = {
  // called by Vue.use(FirstPlugin)
  install(Vue) {
    Vue.prototype.$t = function (key: string, _opts: any) {
      return key;
    };
  },
};

Vue.use(Vuetify);
Vue.use(i18nMockPlugin); // mock i18n
