import debug from 'debug';
import { User } from '../server/models';
import { hashValue } from '../server/modules/crypto';
import { getJWT } from '../server/modules/auth';
import { handleUserData } from '../server/helpers';
import type { LoginParam, SignupParam } from '@/types/api/auth';
import type { UserData, UserFetched } from '@/types/api/user';

const log = debug('api:auth');

export async function login({ email, password }: LoginParam) {
  const isSuccess = false;
  const user: UserFetched = (await User.query()
    .findOne({
      email,
      passwordDigest: hashValue(password),
    })
    .modify('withRole')) as unknown as UserFetched;

  if (!user) {
    return {
      isSuccess,
      message: 'There is no such user.',
    };
  }
  const userData = handleUserData(user);

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
    const user = (await User.query()
      .insertAndFetch({
        email,
        firstName,
        lastName,
        passwordDigest: hashValue(password),
      })
      .modify('withRole')) as unknown as UserFetched;

    const userData = handleUserData(user);

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
