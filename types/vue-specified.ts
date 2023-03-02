export type VFormRef = Vue & { validate: () => boolean };

export interface ComponentQuery {
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
