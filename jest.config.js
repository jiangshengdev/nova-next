module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
    '<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  setupFiles: ['./tests/setup.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'require']
  }
};
