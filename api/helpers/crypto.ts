import crypto from 'crypto';

export const hashValue = (text: string): string =>
  crypto.createHash('sha256').update(text).digest('hex');
