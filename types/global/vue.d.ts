import 'vue';
import rollbar from 'rollbar';

import type { ApiControllerPath, ApiParams, ApiResponse } from '../api';

export type ShowSnackbarParam = {
  isSuccess?: boolean;
  isWarn?: boolean;
  message?: string;
};

declare module 'vue/types/vue' {
  interface Vue {
    $api: <CPath extends ApiControllerPath, Params extends ApiParams<CPath>>(
      controllerPath: CPath,
      params?: Params
    ) => ApiResponse<CPath>;

    $rollbar: rollbar;

    showSnackbar(param: ShowSnackbarParam): void;
  }
}
