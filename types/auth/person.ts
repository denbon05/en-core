import type { UserData as ApiUserData } from '../api/user';

export type UserPermission = {
  id: number;
  name: string;
};

export type UserData = Omit<ApiUserData, 'oauthDigest'>;
