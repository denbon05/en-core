import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from 'crypto';
import type { DecryptedData, EncryptedData } from '@/types/utils/crypto';

const CIPHER_ALGORITHM = 'aes-256-cbc';

// ? use salt
export const hashValue = (text: string): string =>
  createHash('sha256').update(text).digest('hex');

/**
 * Encrypt data using aes-256-cbc cipher
 * @param {object} data for encryption
 * @returns
 */
export const encryptData = (data: object): EncryptedData => {
  const key = randomBytes(32);
  const iv = randomBytes(16); // Generate a random IV
  const cipher = createCipheriv(CIPHER_ALGORITHM, key, iv);
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encrypted,
    key: key.toString('hex'),
    iv: iv.toString('hex'),
  };
};

/**
 * Decrypt data using AES-256 cipher
 * @param {EncryptedData}
 * @returns {DecryptedData}
 */
export const decryptData = ({
  encrypted,
  key,
  iv,
}: EncryptedData): DecryptedData => {
  const decipher = createDecipheriv(
    CIPHER_ALGORITHM,
    Buffer.from(key, 'hex'),
    Buffer.from(iv, 'hex')
  );
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
};
