module.exports = {
  // Specify test environment
  testEnvironment: 'node',

  // Module path configuration
  moduleDirectories: [
    'node_modules',
    'src',
    __dirname
  ],

  // Transform files using Babel
  transform: {
    '^.+\\.js$': 'babel-jest'
  },

  // Coverage configuration
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov']
};