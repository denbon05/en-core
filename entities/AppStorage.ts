import { IAppStorage, StorageKeys, IStorage } from '@/types/api/app-storage';

class AppStorage implements IAppStorage {
  getItem<T extends StorageKeys>(key: T): IStorage[T] | null {
    return JSON.parse(localStorage.getItem(key));
  }

  hasItem<T extends StorageKeys>(key: T): boolean {
    return Boolean(this.getItem(key));
  }

  setItem<T>(key: StorageKeys, value: T) {
    if (typeof value !== 'string') {
      localStorage.setItem(key, JSON.stringify(value));
      return;
    }

    localStorage.setItem(key, value);
  }

  removeItem(key: StorageKeys) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

export default new Proxy(new AppStorage(), {
  get(target, key) {
    if (process.client) {
      return target[key];
    }

    // ? localStorage available only on client side
    return (..._params: any) => null;
  },
});
