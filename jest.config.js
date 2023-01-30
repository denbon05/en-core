// @ts-check
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  modulePaths: [compilerOptions.baseUrl],
  testMatch: ['<rootDir>/__tests__/**/*.test.[jt]s'],
  modulePathIgnorePatterns: ['<rootDir>/__tests__/helpers/*'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
  ],
  setupFiles: ['<rootDir>/__tests__/setup.ts'],
  testEnvironment: 'jsdom',
};
