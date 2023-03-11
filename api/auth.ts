import debug from 'debug';
import { omit } from 'lodash';
import { User } from '../server/models';
import { hashValue } from '../server/modules/crypto';
import { getJWT } from '../server/modules/auth';
import type { LoginParam, SignupParam } from '@/types/api/auth';

const log = debug('api:auth');

export async function login({ email, password }: LoginParam) {
  const isSuccess = false;
  const user = await User.query()
    .findOne({
      email,
      passwordDigest: hashValue(password),
    })
    .withGraphJoined('[permissions]');

  if (!user) {
    return {
      isSuccess,
      message: 'There is no such user.',
    };
  }
  const userData = omit(user, 'passwordDigest', 'oauthDigest');

  return {
    isSuccess: true,
    userData,
    accessToken: getJWT(userData),
  };
}

export async function signup({
  email,
  password,
  firstName,
  lastName,
}: SignupParam) {
  try {
    const user = await User.query().insertAndFetch({
      email,
      firstName,
      lastName,
      passwordDigest: hashValue(password),
    });

    const userData = omit(user, 'passwordDigest', 'oauthDigest');

    return {
      isSuccess: true,
      userData,
      accessToken: getJWT(userData),
    };
  } catch (err) {
    log('signup err %O', err);
    return {
      isSuccess: false,
      message: 'Something went wrong',
    };
  }
}
