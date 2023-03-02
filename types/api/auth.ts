export type LoginParam = {
  email: string;
  password: string;
};

export type AdminEnv = Omit<LoginParam, 'password'> & { passwordHash: string };

export interface GoogleTokenData {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: 'Bearer';
  expiry_date: number;
}

export type JWTPayload = Pick<LoginParam, 'email'>;
