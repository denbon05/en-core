import { GoogleTokenData } from '../api/auth';

export type EncryptedData = {
  encrypted: string;
  key: string;
  iv: string;
};

export type DecryptedData = GoogleTokenData;
