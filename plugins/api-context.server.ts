import path from 'path';
import { Plugin } from '@nuxt/types';
import camelCase from 'lodash/camelCase';
import { ApiControllerPath, ApiParams } from '@/types/api';

const apiContextServer: Plugin = (_context, inject) => {
  inject(
    'api',
    async <CPath extends ApiControllerPath>(
      controller: CPath,
      params: ApiParams<CPath>
    ) => {
      try {
        const { name: funcSnakeName, dir: controllerPath } =
          path.parse(controller);
        const funcCamelName = camelCase(funcSnakeName);
        console.log('api-context.server!!!', controllerPath, funcCamelName);
        const api = require(controllerPath);
        return await api[funcCamelName](params);
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  );
};

export default apiContextServer;
