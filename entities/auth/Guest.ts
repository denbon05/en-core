import { Person } from '@/types/auth/person';

export default class Guest implements Person {
  isGuest = (): boolean => {
    return true;
  };
}
