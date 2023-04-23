const { NODE_ENV } = process.env;

class AppMode {
  public readonly mode: typeof NODE_ENV;

  constructor() {
    this.mode = NODE_ENV;
  }

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
