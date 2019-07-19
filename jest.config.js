'use strict';

const path = require('path');


module.exports = {
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  setupFiles: [path.resolve('tests/setup/enzyme.js')],
};
