import debug from 'debug';
import { getAuthenticatedClient } from '../helpers/google';

const log = debug('api:google:auth');

/**
 * Start by acquiring a pre-authenticated oAuth2 client.
 */
export async function login() {
  log('Log In to google');
  const oauthClient = await getAuthenticatedClient();
  log('Logged In - google');
  // TODO subscribe to specific calendar
}
