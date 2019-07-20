'use strict';

module.exports = {
  root: true,
  extends: 'airbnb',
  settings: {
    'import/core-modules': ['styled-jsx', 'styled-jsx/css'],
  },
  rules: {
    'no-console': 0,
    'prefer-destructuring': 0,
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
        'validation/**/*.js',
        'migrations/**/*.js',
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
      files: ['*.spec.js', '*.spec.jsx'],
      env: { jest: true },
    },
    {
      files: [
        'next.config.js',
        'jest.config.js',
      ],
      rules: {
        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
      },
    },
  ],
};
