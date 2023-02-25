import { ApiControllerPath, ApiParams, ApiResponse } from './api';

declare module '@nuxt/types' {
  interface Context {
    $api: <CPath extends ApiControllerPath>(
      cpath: CPath,
      params: ApiParams<CPath>
    ) => Promise<ApiResponse<CPath>>;
  }
}
