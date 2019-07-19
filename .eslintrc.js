'use strict';

module.exports = {
  root: true,
  extends: 'airbnb',
  overrides: [
    {
      files: ['server/**/*.js'],
      parserOptions: { sourceType: 'script' },
      rules: {
        strict: [2, 'strict'],
      },
    },
  ],
};
