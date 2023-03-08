declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PWD: string;

      GOOGLE_API_KEY?: string;
      GOOGLE_CLIENT_ID?: string;
      GOOGLE_CLIENT_SECRET?: string;
      GOOGLE_REDIRECT_URI_PROD?: string;
      PROD_DB_CONNECTION_STRING?: string;
      DEV_DB_CONNECTION_STRING: string;
      TEST_DB_CONNECTION_STRING: string;
      GOOGLE_AUTH_FILENAME: string;
      JWT_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
