module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  moduleNameMapper: {
    "@grenoble-hands-on/domain": "<rootDir>/../../domain/src",
    "@grenoble-hands-on/web-adapters": "<rootDir>/../../adapters/src"
  }
}
