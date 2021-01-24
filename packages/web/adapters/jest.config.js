module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@grenoble-hands-on/domain": "<rootDir>/../../domain/src",
    "@grenoble-hands-on/web-adapters": "<rootDir>/src"
  }
};