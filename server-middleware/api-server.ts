import type { ServerResponse } from 'http';
import path from 'path';
import debug from 'debug';
import { TokenExpiredError, JwtPayload } from 'jsonwebtoken';
import appMode from '../server/config/mode';
import { verifyJWT } from '../server/modules/auth';
import type { ApiControllerPath, ApiIncomingMsg } from '@/types/api';

const log = debug('app:api');

const apiDirpath = path.join(__dirname, '..', 'api');

export default async <CPath extends ApiControllerPath>(
  { url, cookies: { auth }, params }: ApiIncomingMsg<CPath>,
  res: ServerResponse,
  _next: (err?: Error) => void
) => {
  // make from url module path
  const moduleParsedPath = path.parse(url);
  const { name: funcName, dir: controllerPath } = moduleParsedPath;

  const apiPath = path.join(apiDirpath, controllerPath);

  if (!appMode.isProd()) {
    log('api path %O', {
      reqUrl: url,
      apiPath,
      funcName,
      params,
    });
  }

  try {
    const api = require(`${apiPath}.ts`);
    const func = api[funcName];
    let message: string = '';
    let userData: string | JwtPayload | null = null;

    try {
      // some pages doesn't required user be signed in
      userData = auth ? verifyJWT(auth) : null;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        log(`token expired %p`, err.message);
        // if user was logged in but jwt expired
        // send message that account data is not synced
        message =
          'The session expired. To sync your account you should be Logged In.';
      } else {
        throw err;
      }
    }

    const result = await func(params, userData);
    res.end(
      JSON.stringify({
        ...result,
        message,
      })
    );
  } catch (err) {
    log(`api "${url}${funcName}" error %O`, err);
    res.end(
      JSON.stringify({
        isSuccess: false,
        message: err.message,
      })
    );
  }
};
