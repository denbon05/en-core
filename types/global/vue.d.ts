import 'vue';

import type { ApiControllerPath, ApiParams, ApiResponse } from '../api';

declare module 'vue/types/vue' {
  interface Vue {
    $api: <CPath extends ApiControllerPath, Params extends ApiParams<CPath>>(
      controllerPath: CPath,
      params?: Params
    ) => ApiResponse<CPath>;
  }
}
