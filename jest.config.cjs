/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  bail: 0,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx'],
  coverageDirectory: 'out/coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'html-spa'],
  coverageThreshold: { global: { branches: 50, functions: 50, lines: 50, statements: 50 } },
  moduleNameMapper: {},
  preset: 'ts-jest/presets/js-with-babel',
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [],
  verbose: true,
};
