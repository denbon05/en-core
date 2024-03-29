declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';

      GOOGLE_API_KEY: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_REDIRECT_URI_PROD: string;
      SUPER_ADMIN_EMAIL: string;
      SUPER_ADMIN_PASS: string;
      SUPER_ADMIN_FIRST_NAME: string;
      SUPER_ADMIN_LAST_NAME: string;
      JWT_SECRET: string;
      DATABASE_URL: string;

      ROLLBAR_CLIENT_ACCESS_TOKEN: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
