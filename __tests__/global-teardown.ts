import type { Config } from '@jest/types';

export default async function (
  _globalConfig: Config.GlobalConfig,
  projectConfig: Config.ProjectConfig
) {
  console.log('tear', projectConfig.globals.DB_TEST_URL);
  // todo drop test db
}
