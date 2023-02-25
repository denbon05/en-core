import type { Person } from './person';

export interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: Person;
}
