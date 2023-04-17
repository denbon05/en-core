import { join } from 'path';
import { get } from 'lodash';
import nuxtConfig from '../../nuxt.config';
import { LocaleMessages, MsgPath } from '@/types/locale';

const {
  i18n: { langDir, defaultLocale },
} = nuxtConfig;

export const t = (msgPath: MsgPath, locale: string = defaultLocale): string => {
  const normalizedLangDirpath = langDir.replace(/@/g, '');
  const localePath = join(__dirname, '../..', normalizedLangDirpath, locale);
  const messages: LocaleMessages = require(localePath).default;

  return get(messages, msgPath, '');
};
