import { verifyJWT } from '../server/modules/auth';

export const checkIsUserAuthorized = (auth: string): boolean => {
  try {
    verifyJWT(auth);
    return true;
  } catch (err) {
    return false;
  }
};
