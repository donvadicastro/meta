module.exports = {
  displayName: 'core',
  preset: '../../jest.preset.js',
  transformIgnorePatterns: ["<rootDir>/node_modules/@types/underscore"],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/core',
};
