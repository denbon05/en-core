import type { Knex as KnexType } from 'knex';
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const {
  DEV_DB_CONNECTION_STRING,
  TEST_DB_CONNECTION_STRING,
  PROD_DB_CONNECTION_STRING,
} = process.env;

const migrations = {
  directory: path.join(__dirname, 'server', 'migrations'),
  extension: 'ts',
  noDown: true,
};

const config: { [key: string]: KnexType.Config } = {
  development: {
    client: 'postgresql',
    connection: DEV_DB_CONNECTION_STRING,
    migrations,
  },

  test: {
    client: 'postgresql',
    connection: TEST_DB_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10,
    },
    migrations,
  },

  production: {
    client: 'postgresql',
    connection: PROD_DB_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 20,
    },
    migrations,
  },
};

module.exports = config;
