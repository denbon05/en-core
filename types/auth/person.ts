import { User } from '@prisma/client';

export type UserPermission = {
  id: number;
  name: string;
};

export type UpdateUserData = Pick<User, 'firstName' | 'lastName'>;
