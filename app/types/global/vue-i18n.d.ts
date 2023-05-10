import 'vue-i18n/types';

// todo specify t paths
/**
 * Overloads VueI18n interface to avoid needing to cast return value to string.
 * @see https://github.com/kazupon/vue-i18n/issues/410#issuecomment-577411431
 */
declare module 'vue-i18n/types' {
  export default class VueI18n {
    t(key: Path, locale: Locale, values?: Values): string;
    // eslint-disable-next-line no-dupe-class-members
    t(key: Path, values?: Values): string;
  }
}
