import { get, omit, set } from 'lodash';
import { IAppStorage, StorageData, StoragePath } from '@/types/api/app-storage';

class AppStorage implements IAppStorage {
  getItem<SPath extends StoragePath>(key: SPath): StorageData<SPath> {
    if (!key.includes('.')) {
      // root key
      const parsed = JSON.parse(localStorage.getItem(key));
      return get(parsed, key);
    }

    const [rootKey, ...rest] = key.split('.');
    const parsed = JSON.parse(localStorage.getItem(rootKey));
    return get(parsed[rootKey], rest);
  }

  hasItem<SPath extends StoragePath>(key: SPath): boolean {
    return Boolean(this.getItem(key));
  }

  setItem<SPath extends StoragePath, T>(key: SPath, value: T) {
    if (typeof value !== 'string') {
      localStorage.setItem(key, JSON.stringify(value));
      return;
    }

    if (!key.includes('.')) {
      // so it's a root key
      localStorage.setItem(key, value);
      return;
    }

    const [rootKey, ...rest] = key.split('.');
    const parsed = JSON.parse(localStorage.getItem(rootKey));
    set(parsed[rootKey], rest, value);
    localStorage.setItem(rootKey, JSON.stringify(parsed));
  }

  removeItem<SPath extends StoragePath>(key: SPath) {
    if (!key.includes('.')) {
      localStorage.removeItem(key);
      return;
    }

    const [rootKey, ...rest] = key.split('.');
    const parsed = JSON.parse(localStorage.getItem(rootKey));
    const altered = omit(parsed[rootKey], rest);
    localStorage.setItem(rootKey, JSON.stringify(altered));
  }

  clear() {
    localStorage.clear();
  }
}

export default process.client
  ? new AppStorage()
  : new Error('AppStorage for client side only');
