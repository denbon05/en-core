import { Person } from '@/types/auth/person';

export default class User implements Person {
  private readonly email: string;
  private googleCalendarId: string;

  constructor({ email }) {
    this.email = email;
  }

  setGoogleCalendarId = (id: string) => {
    this.googleCalendarId = id;
  };

  getGoogleCalendarId = () => {
    return this.googleCalendarId;
  };

  getEmail = (): string => {
    return this.email;
  };

  isGuest = (): boolean => {
    return false;
  };
}
