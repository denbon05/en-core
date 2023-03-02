export type IStorage = {
  user?: {
    email: string;
  };
  calendarId?: string;
};

export type StorageKeys = keyof IStorage;

export interface IAppStorage {
  getItem<T extends StorageKeys>(key: T): IStorage[T];

  setItem<T>(key: StorageKeys, value: T): void;

  removeItem(key: StorageKeys): void;

  clear(): void;
}
