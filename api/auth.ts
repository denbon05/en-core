import debug from 'debug';
import prisma from '../server/modules/prisma';
import { getJWT } from '../server/modules/auth';
import { hashValue } from '../server/modules/crypto';
import type { LoginParam, SignupParam } from '@/types/api/auth';

const log = debug('app:api:auth');

export async function login({ email, password }: LoginParam) {
  const isSuccess = false;
  const user = await prisma.user.findFirst({
    where: {
      email,
      passwordDigest: hashValue(password),
    },
  });

  if (!user) {
    return {
      isSuccess,
      message: 'There is no such user.',
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
  try {
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
  } catch (err) {
    log('signup err %O', err);
    return {
      isSuccess: false,
      message: 'Something went wrong',
    };
  }
}
