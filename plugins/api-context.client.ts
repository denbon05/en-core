import type { Context, Inject } from '@nuxt/types/app';
import debug from 'debug';
import type { ApiControllerPath, ApiParams, ApiResponse } from '@/types/api';

const log = debug('app:api');

export default (context: Context, inject: Inject) => {
  inject(
    'api',
    async <CPath extends ApiControllerPath>(
      controller: CPath,
      params: ApiParams<ApiControllerPath>
    ): Promise<ApiResponse<ApiControllerPath>> => {
      try {
        // @ts-ignore
        return await context.$axios['$' + (params ? 'post' : 'get')](
          '/api/' + controller,
          params
        );
      } catch (e) {
        log('api-context.client %O', e);
        throw e;
      }
    }
  );
};
