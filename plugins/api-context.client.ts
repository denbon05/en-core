import type { Context, Inject } from '@nuxt/types/app';

export default <T>(context: Context, inject: Inject) => {
  // todo: specify controller and method types
  inject('api', async (controller: 'ping', method: 'check', params: T) => {
    console.log('I AM IN THE api-context.client.ts');
    try {
      return await context.$axios.$post(
        '/api/' + controller + '/' + method,
        params
      );
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
};
