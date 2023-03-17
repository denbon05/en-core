import type { UserData } from '../api/user';

export type UserState = {
  data: UserData;
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
