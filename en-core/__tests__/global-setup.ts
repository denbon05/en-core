/* eslint-disable no-console */
import { ExecOptions, exec as execCb } from 'child_process';
import { freemem } from 'os';
import { promisify } from 'util';
import type { Config } from '@jest/types';

const exec = promisify(execCb);

const MIN_RAM_FOR_TEST_GB = 3;

export default async function (
  _globalConfig: Config.GlobalConfig,
  projectConfig: Config.ProjectConfig
) {
  // check available RAM, test will consume approximately 5GB
  const availableMemoryGB = freemem() / 1024 ** 3;

  if (availableMemoryGB < MIN_RAM_FOR_TEST_GB) {
    // interrupt the tests, prevent os freezing
    throw new Error(
      `Luck of RAM for test.\nAvailable RAM ${availableMemoryGB} GB`
    );
  }

  // prepare test db
  const cmdOpts: ExecOptions = {
    env: {
      ...process.env,
      DATABASE_URL: projectConfig.globals.DB_TEST_URL as string,
    },
  };
  console.info(
    `\nRunning migration on DB URL "${projectConfig.globals.DB_TEST_URL}"`
  );
  const { stderr: stderrMigration } = await exec(`npm run migrate-db`, cmdOpts);
  if (stderrMigration) {
    console.debug('migration output', stderrMigration);
  }
  // insert predefined data of the app
  const { stderr: stderrSeed } = await exec('npm run seed-db', cmdOpts);
  if (stderrSeed && !/ExperimentalWarning/.test(stderrSeed)) {
    console.debug('seed output', stderrSeed);
  }
}
