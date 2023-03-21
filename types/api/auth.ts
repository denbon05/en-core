import { User } from '@prisma/client';

export type LoginParam = {
  email: string;
  password: string;
};

export type SignupParam = LoginParam & {
  firstName: User['firstName'];
  lastName: User['lastName'];
};

export interface GoogleTokenData {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: 'Bearer';
  expiry_date: number;
}

export type JWTPayload = Pick<LoginParam, 'email'>;
