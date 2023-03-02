// import debug from 'debug';
import { isPasswordValid } from './helpers/crypto';
import { APP_ADMIN } from './config';
import { getJWT } from './helpers/auth';
import type { LoginParam, AdminEnv } from '@/types/api/auth';

// const log = debug('api:auth');
const admin: AdminEnv = JSON.parse(APP_ADMIN);

export function login({ email, password }: LoginParam) {
  const isSuccess = false;

  if (admin.email !== email) {
    return {
      isSuccess,
      message: 'The email is not allowed by admin. Only admin can log in.',
    };
  }

  if (!isPasswordValid(password, admin.passwordHash)) {
    return {
      isSuccess,
      message: 'The password is invalid',
    };
  }

  return {
    isSuccess: true,
    accessToken: getJWT({ email }),
  };
}
