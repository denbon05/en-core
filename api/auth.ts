import debug from 'debug';
import { getJWT } from './helpers/auth';
import { hashValue } from './helpers/crypto';
import { createUser, getUser } from './user';
import type { LoginParam, SignupParam } from '@/types/api/auth';

const log = debug('api:auth');

export async function login({ email, password }: LoginParam) {
  const isSuccess = false;
  const user = await getUser({ email, passwordDigest: hashValue(password) });

  if (!user) {
    return {
      isSuccess,
      message: 'There is no such user.',
    };
  }

  return {
    isSuccess: true,
    accessToken: getJWT({ email }),
  };
}

export async function signup({
  email,
  password,
  firstName,
  lastName,
}: SignupParam) {
  try {
    await createUser({
      email,
      first_name: firstName,
      last_name: lastName,
      password_digest: hashValue(password),
    });
  } catch (err) {
    log('signup err %O', err);
    return {
      isSuccess: false,
      message: 'Something went wrong',
    };
  }
  // todo
}
