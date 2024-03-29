import url from 'url';
import colors from 'vuetify/es5/util/colors';

const { ROLLBAR_CLIENT_ACCESS_TOKEN } = process.env;

const apiPath = '/api';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // titleTemplate: '%s-core',
    title: 'en-core',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      // TODO sm and down version
      // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'darkreader-lock' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.svg' }],
  },

  publicRuntimeConfig: {
    rollbarClientAccessToken: ROLLBAR_CLIENT_ACCESS_TOKEN,
  },

  target: 'server',

  server: {
    port: 8000,
    host: '0.0.0.0',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // TODO screen plugin for client side
    '@/plugins/api-context.client.ts',
    '@/plugins/api-context.server.ts',
    '@/plugins/axios.client.ts',
    '@/plugins/components.client.ts',
    '@/plugins/logger.client.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    'cookie-universal-nuxt',
  ],

  i18n: {
    locales: [{ code: 'en', iso: 'en-US', file: 'en.ts' }],
    defaultLocale: 'en',
    langDir: '@/locales/',
    vueI18n: {
      fallbackLocale: 'en',
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  watch: ['@/plugins/*', '@/utils/'],

  vue: {
    config: {
      productionTip: true,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: [
      '@/assets/style/fonts.scss',
      '@/assets/style/variables.scss',
      '@/assets/style/mixins.scss',
      '@/assets/style/global.scss',
      '@/assets/style/media.scss',
    ],
    theme: {
      dark: false,
      // TODO set own colors https://v2.vuetifyjs.com/en/styles/colors/#material-colors
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          fade: colors.grey.lighten1,
        },
        light: {
          primary: colors.shades.black,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          fade: colors.grey.lighten5,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.resolve.alias['node-fetch-native'] = require.resolve('node-fetch');
    },
    transpile: ['vee-validate/dist/rules'],
  },

  presets: ['@nuxt/babel-preset-app', '@babel/preset-env'],

  serverMiddleware: [
    { path: apiPath, handler: require('body-parser').json() },
    { path: apiPath, handler: require('cookie-parser')() },
    {
      path: apiPath,
      handler: (req, _res, next) => {
        // eslint-disable-next-line n/no-deprecated-api
        req.query = url.parse(req.url, true).query;
        req.params = { ...req.query, ...req.body };
        next();
      },
    },
    { path: apiPath, handler: '@/server-middleware/api-access.ts' },
    { path: apiPath, handler: '@/server-middleware/api-server.ts' },
  ],
};
