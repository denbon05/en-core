import { omit } from 'lodash';
import { decryptData } from '../modules/crypto';
import { UserFetched } from '@/types/api/user';
import { UserData } from '@/types/auth/person';

export const handleUserData = (userData: UserFetched): UserData => {
  const { oauthDigest } = userData;
  if (oauthDigest) {
    const decryptedString = decryptData(oauthDigest);
    const { calendarId } = JSON.parse(decryptedString);
    return {
      calendarId,
      ...omit(userData, 'oauthDigest'),
    };
  }

  return omit(userData, 'oauthDigest');
};
