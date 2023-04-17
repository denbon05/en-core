export type ApiReturn = {
  isSuccess: boolean;
  message?: string;
  code?: number;
};

export type ApiReturnPromise<T> = Promise<ApiReturn & T>;
