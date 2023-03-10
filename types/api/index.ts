import type { IncomingMessage } from 'http';
import * as auth from '@/api/auth';
import * as userData from '@/api/user/data';
import * as googleCalendar from '@/api/google/calendar';
import * as googleAuth from '@/api/google/auth';

type AuthFuncName = keyof typeof auth;
type GoogleCalendarFuncName = keyof typeof googleCalendar;
type GoogleAuthFuncName = keyof typeof googleAuth;
type UserDataFuncName = keyof typeof userData;

type ApiAuth = {
  [K in AuthFuncName]: (typeof auth)[K];
};
type ApiGoogleCalendar = {
  [K in GoogleCalendarFuncName]: (typeof googleCalendar)[K];
};
type ApiGoogleAuth = {
  [K in GoogleAuthFuncName]: (typeof googleAuth)[K];
};
type ApiUserData = {
  [K in UserDataFuncName]: (typeof userData)[K];
};

export interface AppApi {
  auth: ApiAuth;
  user: {
    data: ApiUserData;
  };
  google: {
    calendar: ApiGoogleCalendar;
    auth: ApiGoogleAuth;
  };
}

export type ApiControllerPath<
  Obj extends Record<string, any> = AppApi,
  Key extends keyof Obj = keyof Obj
> = Key extends string
  ? Obj[Key] extends Function
    ? Key
    : // ? Function extends Record<string, any> is true
    Obj[Key] extends Record<string, any> // ? is value is object
    ? Key extends `${infer _Head}${infer _Rest}` // ? not empty key
      ? `${Key}/${ApiControllerPath<Obj[Key]>}`
      : never
    : never
  : never;

type ControllerPathPart<CPath extends string = ApiControllerPath> =
  CPath extends `${infer Head}/${infer Tail}`
    ? Tail extends `${infer _Head}${infer _Rest}`
      ? Head | ControllerPathPart<Tail>
      : Head
    : CPath; // ? last name in the path

export type ApiResponse<
  CPath extends string,
  Obj extends Record<string, any> = AppApi
> = CPath extends `${infer Head}/${infer Tail}` // ? trailing slash
  ? Head extends ControllerPathPart // ? narrow
    ? Tail extends `${infer _Head}${infer _Rest}` // ? not empty
      ? ApiResponse<Tail, Obj[Head]>
      : never
    : never
  : ReturnType<Obj[CPath]> extends Promise<any>
  ? ReturnType<Obj[CPath]>
  : Promise<ReturnType<Obj[CPath]>>;

export type ApiParams<
  CPath extends string,
  Obj extends Record<string, any> = AppApi
> = CPath extends `${infer Head}/${infer Tail}` // ? rest path with slash
  ? Head extends ControllerPathPart
    ? Tail extends `${infer _Head}${infer _Rest}` // ? path not empty
      ? ApiParams<Tail, Obj[Head]>
      : never // ? empty
    : never // ? doesn't controller path
  : Parameters<Obj[CPath]>[number]; // ? CPath is a func name

export type ApiIncomingMsg<CPath extends ApiControllerPath> =
  IncomingMessage & {
    params: ApiParams<CPath>;
    url: ApiControllerPath;
    cookies: {
      [key: string]: string;
    };
  };

export type UserDecoded = null | {
  id: number;
  email: string;
  iat: number;
  exp: number;
};
