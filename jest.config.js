/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: { '^.+.tsx?$': ['ts-jest', {}] },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  verbose: true,
  forceExit: true,
};
