/* eslint-disable */
const path = require('path');

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // eslint-disable-next-line max-len
    project: [path.join(__dirname, './tsconfig.json'), path.join(__dirname, 'tsconfig.dev.json')],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    quotes: ['error', 'single'],
    'import/no-unresolved': 0,
    'object-curly-spacing': ['off', 'always'],
    // 'no-use-before-define': ['off', 'always'],
    // '@typescript-eslint/no-use-before-define': ['error'],
  },
};
