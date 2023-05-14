/* eslint-disable no-console */
import { promisify } from 'util';
import { exec as execCb } from 'child_process';
import type { Config } from '@jest/types';

const exec = promisify(execCb);

export default async function (
  _globalConfig: Config.GlobalConfig,
  { globals: { DB_TEST_URL } }: Config.ProjectConfig
) {
  // make db clean
  const { stderr } = await exec(
    'npx prisma migrate reset --force --skip-seed',
    {
      env: {
        ...process.env,
        DATABASE_URL: DB_TEST_URL as string,
      },
    }
  );
  if (stderr) {
    console.debug('teardown reset db err', stderr);
  }
}
