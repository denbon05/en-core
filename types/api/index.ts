import type { IncomingMessage } from 'http';
import * as auth from '@/api/auth';
import * as calendar from '@/api/calendar';
import * as googleAuth from '@/api/google/auth';
// Todo: define interface for each api return value

// TODO dynamic types corresponding to the api functions
type AuthFuncName = keyof typeof auth;
type CalendarFuncName = keyof typeof calendar;
type GoogleAuthFuncName = keyof typeof googleAuth;

type ApiAuth = {
  [K in AuthFuncName]: ReturnType<(typeof auth)[K]>;
};
type ApiCalendarFunc = {
  [K in CalendarFuncName]: ReturnType<(typeof calendar)[K]>;
};
type ApiGoogleAuthFunc = {
  [K in GoogleAuthFuncName]: ReturnType<(typeof googleAuth)[K]>;
};

export interface AppApi {
  auth: ApiAuth;
  calendar: ApiCalendarFunc;
  google: {
    auth: ApiGoogleAuthFunc;
  };
}

// TODO api in snake case
export type ApiControllerPath<
  Obj extends Record<string, any> = AppApi,
  Key extends keyof Obj = keyof Obj
> = Key extends string
  ? Obj[Key] extends Record<string, any> // ? is value is object
    ? Key extends `${infer _Head}${infer _Rest}` // ? not empty key
      ? `${Key}/${ApiControllerPath<Obj[Key]>}`
      : Key
    : Key
  : '';

type ControllerPathPart<CPath extends string = ApiControllerPath> =
  CPath extends `${infer Head}/${infer Tail}`
    ? Tail extends `${infer _Head}${infer _Rest}`
      ? Head | ControllerPathPart<Tail>
      : Head
    : never;

export type ApiResponse<
  CPath extends string,
  Obj extends Record<string, any> = AppApi
> = CPath extends `${infer Head}/${infer Tail}` // ? trailing slash
  ? Head extends ControllerPathPart
    ? Tail extends `${infer _Head}${infer _Rest}` // ? not empty
      ? ApiResponse<Tail, Obj[Head]>
      : Obj[Head]
    : Obj[Head]
  : never;

export type ApiParams<
  CPath extends string,
  Obj extends Record<string, any> = AppApi
> = CPath extends `${infer Head}/${infer Tail}`
  ? Head extends ControllerPathPart
    ? Tail extends `${infer _Head}${infer _Rest}`
      ? ApiParams<Tail, Obj[Head]>
      : Parameters<Obj[Head]>
    : Parameters<Obj[Head]>
  : never;

export type ApiIncomingMsg<CPath extends ApiControllerPath> =
  IncomingMessage & {
    params: ApiParams<CPath>;
    url: ApiControllerPath;
  };
