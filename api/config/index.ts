import dotenv from 'dotenv';
import appMode from './mode';

dotenv.config();

const {
  APP_ADMIN: APP_ADMIN_PROD,
  NODE_ENV,
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI_PROD,
  GOOGLE_AUTH_FILENAME = '.gauth.json',
  GOOGLE_CALENDAR_ID_DEV,
  JWT_SECRET = 'secret',
} = process.env;

const GOOGLE_REDIRECT_URI_DEV =
  'http://localhost:3000/api/google/oauth2callback';
const APP_ADMIN_DEV =
  '{"email": "admin@g.com","passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"}';

const APP_ADMIN = appMode.isProd() ? APP_ADMIN_PROD : APP_ADMIN_DEV;
const GOOGLE_CALENDAR_ID = appMode.isProd() ? 'TODO' : GOOGLE_CALENDAR_ID_DEV;

const GOOGLE_REDIRECT_URI = appMode.isProd()
  ? GOOGLE_REDIRECT_URI_PROD
  : GOOGLE_REDIRECT_URI_DEV;

export {
  APP_ADMIN,
  NODE_ENV,
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_AUTH_FILENAME,
  JWT_SECRET,
};
