/* eslint-disable no-console */
import { promisify } from 'util';
import { ExecOptions, exec as execCb } from 'child_process';
import type { Config } from '@jest/types';

const exec = promisify(execCb);

export default async function (
  _globalConfig: Config.GlobalConfig,
  projectConfig: Config.ProjectConfig
) {
  // prepare test db
  const cmdOpts: ExecOptions = {
    env: {
      ...process.env,
      DATABASE_URL: projectConfig.globals.DB_TEST_URL as string,
    },
  };
  const migrationResult = await exec(`npm run migrate-db`, cmdOpts);
  if (migrationResult.stderr) {
    console.debug('migration output', migrationResult);
  }
  // insert predefined data of the app
  const seedResult = await exec('npm run seed-db', cmdOpts);
  if (seedResult.stderr) {
    console.debug('seed output', seedResult);
  }
}
