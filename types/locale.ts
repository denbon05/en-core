import type enLocale from '@/locales/en';

/**
 * Common language locale interface.
 */
export type LocaleMessages = typeof enLocale;

type ReturnMsgPath<
  Obj extends Record<string, unknown> = LocaleMessages,
  K extends keyof Obj = keyof Obj
> = K extends string
  ? Obj[K] extends string
    ? K
    : Obj[K] extends Record<string, unknown>
    ? `${K}.${ReturnMsgPath<Obj[K]>}`
    : never
  : never;

export type MsgPath = ReturnMsgPath;
