import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

export const getJWT = (payload: string | object | Buffer) =>
  sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });

export const verifyJWT = (token: string) => verify(token, JWT_SECRET);
