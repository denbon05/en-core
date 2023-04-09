import type { UserData } from '../api/user';

export type UserState = {
  data: Exclude<UserData, null>;
};

export interface AuthState {
  accessToken: string;
}

export interface GoogleState {
  calendarId: string;
}

export interface RootState {
  auth: AuthState;
  google: GoogleState;
}
