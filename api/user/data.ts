import debug from 'debug';
import { User } from '../../server/models';
import { UpdateUserData } from '@/types/auth/person';
import { UserData } from '@/types/api/user';

const log = debug('api:user:data');

export async function update(
  { firstName, lastName }: UpdateUserData,
  { id }: UserData
) {
  try {
    await User.query()
      .update({
        firstName,
        lastName,
        updatedAt: new Date().toISOString(),
      })
      .where({ id });
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
