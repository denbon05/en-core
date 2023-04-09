// import '../modules/init';
import appMode from './mode';

const {
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: GOOGLE_REDIRECT_URI_PROD,
  JWT_SECRET,
  NODE_ENV,
} = process.env;

const GOOGLE_REDIRECT_URI = appMode.isProd()
  ? GOOGLE_REDIRECT_URI_PROD
  : 'http://localhost:3000/api/google/oauth2callback';

export {
  NODE_ENV,
  GOOGLE_API_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  JWT_SECRET,
};
