import knex from './modules/knex';
import type { CreateUserParam, GetUserParam } from '@/types/api/user';

export const getUser = async ({ email, passwordDigest }: GetUserParam) => {
  const [user] = await knex('users')
    .select('id')
    .where({ email, password_digest: passwordDigest });

  return user;
};

export const createUser = async ({
  email,
  first_name,
  last_name,
  password_digest,
}: CreateUserParam) => {
  await knex('users').insert({
    email,
    first_name,
    last_name,
    password_digest,
  });
  // todo
};
