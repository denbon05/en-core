import 'vue';
import type { ApiController, ApiMethodByController } from './api';

declare module 'vue/types/vue' {
  interface Vue {
    $api: <C extends ApiController, M extends ApiMethodByController[C], T, T2>(
      controller: C,
      method: M,
      params: T
    ) => Promise<T2>;
    // Todo: return type Promise<ApiResponse[ApiController][ApiMethod]>;

    // $t:
  }
}
