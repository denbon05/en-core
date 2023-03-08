import type { User } from 'knex/types/tables';

export type GetUserParam = {
  email: string;
  passwordDigest: string;
};

export type CreateUserParam = Pick<
  User,
  'first_name' | 'last_name' | 'email' | 'password_digest'
>;
