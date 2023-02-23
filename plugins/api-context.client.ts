import debug from 'debug';
import type { Context, Inject } from '@nuxt/types/app';
import type { ApiControllerPath } from '@/types/api';

const log = debug('app:api');

export default (context: Context, inject: Inject) => {
  inject(
    'api',
    async <T, CPath extends ApiControllerPath>(
      controller: CPath,
      params?: T
    ) => {
      log('api-context.client %O', { params });
      try {
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
