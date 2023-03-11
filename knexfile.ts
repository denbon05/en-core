import type { Knex as KnexType } from 'knex';
const { join } = require('path');
const { knexSnakeCaseMappers } = require('objection');
const dotenv = require('dotenv');

dotenv.config();

const {
  DEV_DB_CONNECTION_STRING,
  TEST_DB_CONNECTION_STRING,
  PROD_DB_CONNECTION_STRING,
} = process.env;

const commonConfig = {
  migrations: {
    directory: join(__dirname, 'server', 'migrations'),
    extension: 'ts',
    noDown: true,
  },
  seeds: {
    directory: join(__dirname, 'server', 'seeds'),
  },
  ...knexSnakeCaseMappers(),
};

const config: { [key: string]: KnexType.Config } = {
  development: {
    client: 'postgresql',
    connection: DEV_DB_CONNECTION_STRING,
    ...commonConfig,
  },

  test: {
    client: 'postgresql',
    connection: TEST_DB_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10,
    },
    ...commonConfig,
  },

  production: {
    client: 'postgresql',
    connection: PROD_DB_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 20,
    },
    ...commonConfig,
  },
};

module.exports = config;
