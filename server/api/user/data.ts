import { UserDataOrNull } from '@/types/api/user';
import { UpdateUserData } from '@/types/auth/person';
import debug from 'debug';
import prisma from '../../modules/prisma';

const log = debug('app:api:user:data');
// * Api forbidden by server middleware for unauthorized users

export async function update(
  // todo add reset password
  { firstName, lastName }: UpdateUserData,
  { id }: Exclude<UserDataOrNull, null>
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
