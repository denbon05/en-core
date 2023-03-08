import type { User } from 'knex/types/tables';

export type LoginParam = {
  email: string;
  password: string;
};

export type SignupParam = LoginParam & {
  firstName: User['first_name'];
  lastName: User['last_name'];
};

export interface GoogleTokenData {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: 'Bearer';
  expiry_date: number;
}

export type JWTPayload = Pick<LoginParam, 'email'>;
