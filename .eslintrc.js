'use strict';

module.exports = {
  root: true,
  extends: 'airbnb',
  parser: 'babel-eslint',
  settings: {
    'import/core-modules': ['styled-jsx', 'styled-jsx/css'],
  },
  rules: {
    'no-console': 0,
    'prefer-destructuring': 0,
    'func-names': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/anchor-is-valid': [2, {
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
      aspects: ['invalidHref', 'preferButton'],
    }],
  },
  overrides: [
    {
      files: [
        'server/**/*.js',
        'migrations/**/*.js',
        'utils/**/*.js',
        'validation-schemas.js',
        'next.config.js',
        'knexfile.js',
        'jest.config.js',
      ],
      parserOptions: { sourceType: 'script' },
      rules: {
        strict: [2, 'global'],
      },
    },
    {
      files: [
        'components/**/*.jsx',
        'pages/**/*.jsx',
        'client.js',
      ],
      env: { browser: true },
    },
    {
      files: ['*.spec.js', '*.spec.jsx'],
      env: { jest: true, browser: true },
      rules: {
        'import/first': 0,
      },
    },
    {
      files: [
        'migrations/**/*.js',
        'next.config.js',
        'jest.config.js',
      ],
      rules: {
        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
      },
    },
  ],
};
