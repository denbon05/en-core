import dotenv from 'dotenv';
import appMode from './mode';

dotenv.config();

const {
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI_PROD,
  GOOGLE_AUTH_FILENAME,
  JWT_SECRET,
  NODE_ENV,
} = process.env;

const GOOGLE_REDIRECT_URI_DEV =
  'http://localhost:3000/api/google/oauth2callback';
// const APP_ADMIN_DEV =
//   '{"email": "admin@g.com","passwordHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"}';

const GOOGLE_REDIRECT_URI = appMode.isProd()
  ? GOOGLE_REDIRECT_URI_PROD
  : GOOGLE_REDIRECT_URI_DEV;

export {
  NODE_ENV,
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_AUTH_FILENAME,
  JWT_SECRET,
};
