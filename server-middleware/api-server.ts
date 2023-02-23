import type { ServerResponse } from 'http';
import path from 'path';
import debug from 'debug';
import camelCase from 'lodash/camelCase';
import appMode from '../api/config/mode';
import type { ApiControllerPath, ApiIncomingMsg } from '@/types/api';

const log = debug('app:api');

const apiDirpath = path.join(__dirname, '..', 'api');

// TODO infer server response according to func and controller names
export default async <CPath extends ApiControllerPath>(
  req: ApiIncomingMsg<CPath>,
  res: ServerResponse,
  _next: (err: Error) => void
) => {
  // make from url module path
  const moduleParsedPath = path.parse(req.url);
  const { name: funcSnakeName, dir: controllerPath } = moduleParsedPath;

  // TODO paths in a snake case, funcNames in camel case
  const funcCamelName = camelCase(funcSnakeName);

  const apiPath = path.join(apiDirpath, controllerPath);

  if (!appMode.isProd()) {
    log('api path %O', {
      reqUrl: req.url,
      apiPath,
      funcCamelName,
      params: req.params,
    });
  }

  try {
    const api = require(`${apiPath}.ts`);
    const result = await api[funcCamelName](req.params);

    res.end(JSON.stringify(result));
  } catch (err) {
    if (funcSnakeName.startsWith('_')) {
      log('The api is not allowed by the client %O', {
        funcName: funcCamelName,
      });
      res.end(`Can't reach the api function: "${funcCamelName}"`);
      return;
    }

    log('Api error %O', err);
    res.end(err.message);
  }
};
