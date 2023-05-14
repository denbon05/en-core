import debug from 'debug';
import prisma from '../../../modules/prisma';
import { UserData } from '@/types/api/user';
import { UpdateUserData } from '@/types/auth/person';

const log = debug('app:api:user:data');
// * API forbidden by server middleware for unauthorized users

export async function update(
  // todo add reset password
  { firstName, lastName }: UpdateUserData,
  { id }: UserData
) {
  try {
    await prisma.user.update({
      data: {
        firstName,
        lastName,
        updatedAt: new Date(),
      },
      where: {
        id,
      },
    });
    return {
      isSuccess: true,
    };
  } catch (err) {
    log('update err', err.message);
    return {
      isSuccess: false,
      message: err.message,
    };
  }
}
