import { UserDataOrNull } from '@/types/api/user';
import { EncryptedData } from '@/types/utils/crypto';
import debug from 'debug';
import { getAuthenticatedClient } from '../../helpers/google';
import { decryptData, encryptData } from '../../modules/crypto';
import prisma from '../../modules/prisma';

const log = debug('app:api:google:auth');

// * The google path forbidden for non-auth users by middleware

/**
 * Start by acquiring a pre-authenticated oAuth2 client.
 */
export async function login(
  _args: never,
  { id }: Exclude<UserDataOrNull, null>
) {
  log('Log In to google');
  const oauthClient = await getAuthenticatedClient(id);
  log('Logged In - google');
  oauthClient.on('tokens', async (tokens) => {
    console.log('TOKENS!!!!!!!!');
    if (tokens.refresh_token) {
      console.log('REFRESH TOKEN!!!!!!!!!!', { id });
      const encryptedOAuth = encryptData(tokens);
      await prisma.user.update({
        where: { id },
        data: {
          google: {
            update: {
              oauth: encryptedOAuth,
            },
          },
        },
      });
    }
  });
}

export async function status(
  _args: never,
  { id }: Exclude<UserDataOrNull, null>
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        google: {
          select: {
            calendarIds: true,
            oauth: true,
          },
        },
      },
    });

    if (!user?.google) {
      // user not even authorized
      return {
        isSuccess: true,
        status: {
          isCalendarSynced: false,
          isAuthenticated: false,
        },
      };
    }
    const {
      google: { oauth, calendarIds },
    } = user;
    const { expiry_date } = decryptData(oauth as Cast<EncryptedData>);

    return {
      isSuccess: true,
      status: {
        isCalendarSynced: Boolean(calendarIds),
        isAuthenticated: new Date() < new Date(expiry_date),
      },
    };
  } catch (err) {
    log('Fetch status err %O', err);
    return {
      isSuccess: false,
      message: err.message,
    };
  }
}
