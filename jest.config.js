module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/Pages/**/*.{js,jsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};
