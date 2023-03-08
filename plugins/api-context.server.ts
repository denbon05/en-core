import path from 'path';
import { Plugin } from '@nuxt/types';
import debug from 'debug';
import camelCase from 'lodash/camelCase';
import { ApiControllerPath, ApiParams, ApiResponse } from '@/types/api';

const log = debug('api:context');

const apiContextServer: Plugin = (_ctx, inject) => {
  inject(
    'api',
    async <CPath extends ApiControllerPath>(
      controller: CPath,
      params: ApiParams<CPath>
    ): Promise<Awaited<ApiResponse<CPath>>> => {
      try {
        const { name: funcSnakeName, dir: controllerPath } =
          path.parse(controller);
        const funcCamelName = camelCase(funcSnakeName);
        log('api-context.server %p', { controllerPath, funcCamelName });
        const api = require(controllerPath);
        return await api[funcCamelName](params);
      } catch (e) {
        log('api err %p', e);
        throw e;
      }
    }
  );
};

export default apiContextServer;
