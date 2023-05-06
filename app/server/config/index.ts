import { join } from 'path';
import { config } from 'dotenv';
import appMode from './mode';

// load env variables
(() => {
  if (!appMode.isProd) {
    // load dev variables
    config({
      debug: true,
      path: join(process.cwd(), '.env.dev'),
    });
  }

  config({
    debug: !appMode.isProd,
    path: join(process.cwd(), '.env'),
  });
})();

const {
  APP_GMAIL,
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: GOOGLE_REDIRECT_URI_PROD,
  JWT_SECRET,
  NODE_ENV,
  ETHEREAL_HOST,
  ETHEREAL_PORT,
  ETHEREAL_USER,
  ETHEREAL_PASS,
  GOOGLE_APP_PASS,
  SUPPORT_EMAIL,
} = process.env;

const GOOGLE_REDIRECT_URI = appMode.isProd
  ? GOOGLE_REDIRECT_URI_PROD
  : 'http://localhost:3000/api/google/oauth2callback';

export {
  NODE_ENV,
  APP_GMAIL,
  SUPPORT_EMAIL,
  GOOGLE_APP_PASS,
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  JWT_SECRET,
  ETHEREAL_HOST,
  ETHEREAL_PORT,
  ETHEREAL_USER,
  ETHEREAL_PASS,
};
