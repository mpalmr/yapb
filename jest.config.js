'use strict';

const path = require('path');


module.exports = {
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  setupFiles: [
    'jest-localstorage-mock',
    path.resolve('tests/setup/enzyme.js'),
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
};
