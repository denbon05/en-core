import debug from 'debug';
import type { Context } from '@nuxt/types';
import { HttpException } from '@/utils/errors';

const log = debug('app:axios:client');

export default function ({
  store,
  app: { $axios, $cookies },
  redirect,
}: Context) {
  $axios.onRequest((config) => {
    const { accessToken } = store.state.auth;
    // check if the user is authenticated
    if (accessToken) {
      $cookies.set('auth', accessToken);
      // set the Authorization header using the access token
      config.headers.Authorization = 'Bearer ' + accessToken;
    }

    return config;
  });

  $axios.onError(async (error) => {
    const statusCode = error.response ? error.response.status : -1;
    if (statusCode === 401 || statusCode === 422) {
      // todo implement refreshToken logic
      const refreshToken = store.state.auth.refreshToken;
      log('onErr %O', error);
      if (
        error.response!.data.errorCode === 'JWT_TOKEN_EXPIRED' &&
        refreshToken
      ) {
        if (
          Object.prototype.hasOwnProperty.call(error.config, 'retryAttempts')
        ) {
          store.dispatch('auth/logOut');
          return redirect('/auth');
        }
        const config = { retryAttempts: 1, ...error.config };
        try {
          await store.dispatch('auth/refresh');
          return Promise.resolve($axios(config));
        } catch (err) {
          log('refresh err %O', err);
          store.dispatch('auth/logOut');
          // return redirect('/auth');
          return;
        }
      }

      log('Log Out');
      store.dispatch('auth/logOut');
      return redirect('/auth');
    }

    return Promise.reject(error);
  });

  $axios.interceptors.response.use(
    (response) => response,
    (err) => {
      const { status } = err.response;
      const httpError: HttpException = new HttpException(err.message);
      httpError.statusCode = status;
      return Promise.reject(httpError);
    }
  );
}
