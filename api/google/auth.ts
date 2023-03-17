import debug from 'debug';
import { getAuthenticatedClient } from '../helpers/google';
import { UserData } from '@/types/api/user';

const log = debug('app:api:google:auth');

/**
 * Start by acquiring a pre-authenticated oAuth2 client.
 */
export async function login(_args: never, { id }: UserData) {
  log('Log In to google');
  const oauthClient = await getAuthenticatedClient(id);
  log('Logged In - google', oauthClient);
  // TODO subscribe to specific calendar
}
