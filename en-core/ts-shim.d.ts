// If this shim were missing, running tests against Vue components will
// trigger an error: error TS2307: Cannot find module '{path to component}';
// https://al-un.github.io/learn-nuxt-ts/06.test.html
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
