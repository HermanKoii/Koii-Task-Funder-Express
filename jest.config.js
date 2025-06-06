module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@_koii/create-task-cli)/)'
  ],
  moduleNameMapper: {
    '^@_koii/create-task-cli$': '<rootDir>/tests/__mocks__/create-task-cli.js'
  }
};