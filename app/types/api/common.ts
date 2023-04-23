export type ApiReturn = {
  isSuccess: boolean;
  message?: string;
};

export type ApiReturnPromise<T> = Promise<ApiReturn & T>;
