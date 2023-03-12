import type { BinaryLike } from 'crypto';
import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import { CIPHER_KEY, INITIALIZATION_VECTOR } from '../../config';

// ? use salt
export const hashValue = (text: string): string =>
  createHash('sha256').update(text).digest('hex');

/**
 * Encrypt data using AES-256 cipher
 * @param {BinaryLike} data for encryption
 * @returns
 */
export const encryptData = (data: BinaryLike): string => {
  const cipher = createCipheriv(
    'aes-256-cbc',
    CIPHER_KEY,
    INITIALIZATION_VECTOR
  );
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return encrypted.toString('hex');
};

/**
 * Decrypt data using AES-256 cipher
 * @param {string} encryptedData
 * @returns
 */
export const decryptData = (encryptedData: string): string => {
  const decipher = createDecipheriv(
    'aes-256-cbc',
    CIPHER_KEY,
    Buffer.from(INITIALIZATION_VECTOR, 'hex')
  );
  let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
