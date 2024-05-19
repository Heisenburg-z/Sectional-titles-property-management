module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: []
};
