import { Guest, User } from '@/entities';

export type UserState = {
  instance: User | Guest;
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
