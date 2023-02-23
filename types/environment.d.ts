declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      PWD: string;

      GOOGLE_API_KEY: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_REDIRECT_URI_PROD: string;
      GOOGLE_AUTH_FILENAME: string;
      GOOGLE_CALENDAR_ID_DEV: string;

      /**
       * JSON format
       */
      APP_ADMIN: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
