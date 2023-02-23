import dotenv from 'dotenv';

dotenv.config();
const { NODE_ENV } = process.env;

class AppMode {
  isDev(): boolean {
    return NODE_ENV === 'development' || !NODE_ENV;
  }

  isProd(): boolean {
    return NODE_ENV === 'production';
  }

  isTest(): boolean {
    return NODE_ENV === 'test';
  }
}

export default new AppMode();
