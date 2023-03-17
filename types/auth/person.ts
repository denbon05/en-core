import type { UserData } from '../api/user';

export type UserPermission = {
  id: number;
  name: string;
};

export type UpdateUserData = Pick<UserData, 'firstName' | 'lastName'>;
