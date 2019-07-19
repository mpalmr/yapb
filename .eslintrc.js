'use strict';

module.exports = {
  root: true,
  extends: 'airbnb',
  rules: {
    'no-console': 0,
    'prefer-destructuring': 0,
  },
  overrides: [
    {
      files: [
        'server/**/*.js',
        'validation/**/*.js',
        'migrations/**/*.js',
        'knexfile.js',
        'jest.config.js',
      ],
      parserOptions: { sourceType: 'script' },
      rules: {
        strict: [2, 'global'],
      },
    },
    {
      files: ['*.spec.js', '*.spec.jsx'],
      env: { jest: true },
    },
  ],
};
