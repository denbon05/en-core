import AppStorage from './AppStorage';

if (AppStorage instanceof Error) {
  throw AppStorage;
}

export { AppStorage };
