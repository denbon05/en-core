import prisma from '../../modules/prisma';
import { ApiReturnPromise } from '@/types/api/common';
import { UserList, UsersFetchParam } from '@/types/api/manage';

export async function fetch({ roleName }: UsersFetchParam): ApiReturnPromise<{
  list: UserList;
}> {
  const users = await prisma.user.findMany({
    select: {
      firstName: true,
      lastName: true,
      id: true,
    },
    where: {
      roles: {
        some: {
          name: roleName,
        },
      },
    },
  });

  return {
    list: users,
    isSuccess: true,
  };
}
