import { Person } from '@/types/auth/person';

export default class User implements Person {
  isGuest(): boolean {
    return false;
  }
}
