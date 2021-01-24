module.exports = {
  preset: 'jest-preset-angular',
  testURL: 'https://github.com/@angular-cli-builders',
  setupFilesAfterEnv: [`<rootDir>/node_modules/@angular-builders/jest/dist/jest-config/setup.js`],
  moduleNameMapper: {
    "@grenoble-hands-on/domain": "<rootDir>/../../../domain/src",
    "@grenoble-hands-on/web-adapters": "<rootDir>/../../adapters/src"
  }
};
