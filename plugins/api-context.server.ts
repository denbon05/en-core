/* eslint-disable no-console */
import type { Context, Inject } from '@nuxt/types/app';
import type { ApiController, ApiMethodByController } from '@/types/api';
// todo: remove console
export default <P>(_context: Context, inject: Inject) => {
  inject(
    'api',
    async (
      controller: ApiController,
      method: ApiMethodByController[ApiController],
      params: P
    ) => {
      console.log('api-context.server HIIIIIII!');
      try {
        const api = require('@/api/' +
          controller.replace(/^\/+|\/+$|\.+/g, ''));
        return await api[method](params);
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  );
};
