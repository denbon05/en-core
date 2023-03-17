import debug from 'debug';
import { User } from '../server/models';
import { getJWT } from '../server/modules/auth';
import { hashValue } from '../server/modules/crypto';
import type { LoginParam, SignupParam } from '@/types/api/auth';

const log = debug('app:api:auth');

export async function login({ email, password }: LoginParam) {
  const isSuccess = false;
  const user = await User.query()
    .findOne({
      email,
      passwordDigest: hashValue(password),
    })
    .modify('withRole');

  if (!user) {
    return {
      isSuccess,
      message: 'There is no such user.',
    };
  }
  console.log({ user });

  return {
    isSuccess: true,
    userData: user,
    accessToken: getJWT(user),
  };
}

export async function signup({
  email,
  password,
  firstName,
  lastName,
}: SignupParam) {
  try {
    const user = await User.query()
      .insertAndFetch({
        email,
        firstName,
        lastName,
        password,
      })
      .modify('withRole');
    console.log('signup user', { user });

    return {
      isSuccess: true,
      userData: user,
      accessToken: getJWT(user),
    };
  } catch (err) {
    log('signup err %O', err);
    return {
      isSuccess: false,
      message: 'Something went wrong',
    };
  }
}
