import { Role, User } from '@prisma/client';

export type UsersFetchParam = {
  roleName: Role;
};

export type ManagedUser = Pick<User, 'firstName' | 'lastName' | 'id'>;

export type UserList = ManagedUser[];
