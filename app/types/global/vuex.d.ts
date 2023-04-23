import { NuxtCookies } from 'cookie-universal-nuxt';
import type { ApiControllerPath, ApiParams, ApiResponse } from '../api';

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $api: <CPath extends ApiControllerPath>(
      cpath: CPath,
      params?: ApiParams<CPath>
    ) => ApiResponse<CPath>;

    $cookies: NuxtCookies;
  }
}
