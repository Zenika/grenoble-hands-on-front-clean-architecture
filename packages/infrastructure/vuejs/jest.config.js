module.exports = {
  moduleFileExtensions: ['ts', 'js', 'jsx', 'json', 'vue'],
  transform: {
    "^.+\\.tsx?$": require.resolve("ts-jest"),
    '^.+\\.vue$': require.resolve('@vue/vue3-jest'),
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      require.resolve('jest-transform-stub'),
    '^.+\\.jsx?$': require.resolve('babel-jest')
  },
  moduleNameMapper: {
    "@grenoble-hands-on/domain": "<rootDir>/../../domain/src",
    "@grenoble-hands-on/web-adapters": "<rootDir>/../../adapters/src",
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)'
  ],
  transformIgnorePatterns: ['/node_modules/'],
  snapshotSerializers: ['jest-serializer-vue'],
  testEnvironment: 'jsdom',
}
