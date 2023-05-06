const { NODE_ENV } = process.env;

class AppMode {
  public readonly mode: typeof NODE_ENV;

  constructor() {
    this.mode = NODE_ENV;
  }

  isDev: boolean = NODE_ENV === 'development' || !NODE_ENV;

  isProd: boolean = NODE_ENV === 'production';

  isTest: boolean = NODE_ENV === 'test';
}

export default new AppMode();
