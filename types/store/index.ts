import type { UserData } from '../auth/person';

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
