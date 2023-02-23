import crypto from 'crypto';

const getHashed = (text: string): string =>
  crypto.createHash('sha256').update(text).digest('hex');

export const isPasswordValid = (password: string, hash: string) => {
  const userHash = getHashed(password);

  return userHash === hash;
};
