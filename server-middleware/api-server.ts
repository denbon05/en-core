import type { ServerResponse } from 'http';
import path from 'path';
import debug from 'debug';
import camelCase from 'lodash/camelCase';
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
  const { name: funcSnakeName, dir: controllerPath } = moduleParsedPath;

  // TODO paths in a snake case, funcNames in camel case
  const funcCamelName = camelCase(funcSnakeName);

  const apiPath = path.join(apiDirpath, controllerPath);

  if (!appMode.isProd()) {
    log('api path %O', {
      reqUrl: url,
      apiPath,
      funcCamelName,
      params,
    });
  }

  try {
    const api = require(`${apiPath}.ts`);
    const func = api[funcCamelName];
    const userData = auth ? verifyJWT(auth) : null;

    const result = await func(params, userData);
    res.end(JSON.stringify(result));
  } catch (err) {
    log('Api error %O', err);
    res.end(err.message);
  }
};
