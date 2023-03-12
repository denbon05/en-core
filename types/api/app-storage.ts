import type { UserData } from '../auth/person';

export type IStorage = {
  user: {
    [Key in keyof UserData]: UserData[Key];
  };
};

export type StorageKey = keyof IStorage;

export type StoragePath = StorageKey | `${StorageKey}.${keyof UserData}`;

type StoragePathPart<SPath extends string = StoragePath> =
  SPath extends `${infer Head}.${infer Tail}`
    ? Tail extends `${infer _Head}${infer _Rest}`
      ? Head | StoragePathPart<Tail>
      : Head
    : SPath; // ? last name in the path

export type StorageData<
  SPath extends string,
  Obj extends Record<string, any> = IStorage
> = SPath extends `${infer Head}.${infer Tail}`
  ? Head extends StoragePathPart
    ? StorageData<Tail, Obj[Head]>
    : never
  : SPath extends StoragePathPart
  ? Obj[SPath]
  : never;

export interface IAppStorage {
  getItem<T extends StorageKey>(key: T): IStorage[T];

  setItem<T>(key: StorageKey, value: T): void;

  removeItem(key: StorageKey): void;

  clear(): void;
}
