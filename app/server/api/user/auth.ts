import debug from 'debug';
import { getJWT } from '../../modules/auth';
import { hashValue } from '../../modules/crypto';
import prisma from '../../modules/prisma';
import type { LoginParam, SignupParam } from '@/types/api/auth';

const log = debug('app:user:auth');

export async function login({ email, password }: LoginParam) {
  const user = await prisma.user.findFirst({
    where: {
      email,
      passwordDigest: hashValue(password),
    },
  });

  log('login user %O', user);
  if (!user) {
    return {
      isSuccess: false,
      message: 'There is no such user',
    };
  }
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
  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      passwordDigest: hashValue(password),
    },
  });

  return {
    isSuccess: true,
    userData: user,
    accessToken: getJWT(user),
  };
}
