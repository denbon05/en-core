import http from 'http';
import { execSync } from 'child_process';
import url from 'url';
import { Prisma, User } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';
import openBrowser from 'open';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} from '../config';
import { encryptData } from '../modules/crypto';
import prisma from '../modules/prisma';

/**
 * Create a new OAuth2Client, and go through the OAuth2 content
 * workflow.  Return the full client to the callback.
 */
export const getAuthenticatedClient = (
  userId: User['id']
): Promise<OAuth2Client> => {
  return new Promise((resolve, reject) => {
    // create an oAuth client to authorize the API call.
    // Secrets are kept in a`keys.json` file,
    // which should be downloaded from the Google Developers Console.
    const oAuth2Client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/calendar',
    });
    // clear the port for server
    execSync('npx kill-port 3000');

    // Open an http server to accept the oauth callback. In this simple example, the
    // only request to our webserver is to /oauth2callback?code=<code>
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url!.includes('/oauth2callback')) {
            // acquire the code from the querystring, and close the web server.
            const qs = new url.URL(req.url!, 'http://localhost:3000')
              .searchParams;
            const code = qs.get('code') as string;
            // TODO close tab and return to home page
            res.end('Authentication successful! Please close the tab.');
            server.close();

            // Now that we have the code, use that to acquire tokens.
            const authData = await oAuth2Client.getToken(code);
            // Make sure to set the credentials on the OAuth2 client.
            oAuth2Client.setCredentials(authData.tokens);
            const oauthEncrypted = encryptData(authData.tokens);
            await prisma.user.update({
              where: { id: userId },
              data: {
                google: {
                  upsert: {
                    create: {
                      oauth: oauthEncrypted as Prisma.JsonObject,
                    },
                    update: {
                      oauth: oauthEncrypted as Prisma.JsonObject,
                    },
                  },
                },
              },
            });
            resolve(oAuth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        openBrowser(authorizeUrl, { wait: false }).then((cp) => cp.unref());
      });
  });
};
