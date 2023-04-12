/* eslint-disable no-console */
import { promisify } from 'util';
import { exec as execCb } from 'child_process';
import type { Config } from '@jest/types';

const exec = promisify(execCb);

export default async function (_globalConfig: Config.GlobalConfig) {
  const { stderr } = await exec('npx prisma migrate reset --force --skip-seed');
  if (stderr) {
    console.debug('teardown reset db err', stderr);
  }
}
