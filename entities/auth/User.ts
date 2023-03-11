import AppStorage from '../AppStorage';
import type { IUserData, Person } from '@/types/auth/person';
import { StoragePath } from '@/types/api/app-storage';

export default class User implements Person {
  private readonly email: string;
  private googleCalendarId: string;

  constructor(userData: IUserData) {
    AppStorage.setItem('user', userData);
  }

  has(key: StoragePath): boolean {
    return AppStorage.hasItem(key);
  }

  setGoogleCalendarId = (id: string) => {
    AppStorage.setItem('user.calendarId', id);
  };

  getGoogleCalendarId = (): string => {
    return AppStorage.getItem('user').calendarId;
  };

  getEmail = (): string => {
    return AppStorage.getItem('user').email;
  };

  isGuest = (): boolean => {
    return false;
  };
}
