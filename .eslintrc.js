'use strict'

module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
  },

  extends: [
    '@strv/javascript/environments/nodejs/v8-3',
    '@strv/javascript/environments/nodejs/optional',
    '@strv/javascript/coding-styles/recommended',
  ],

  rules: {
    // If your editor cannot show these to you, occasionally turn this off and run the linter
    'no-warning-comments': 0,
    'max-len': [1, 120],

    'max-classes-per-file': 0,
    'require-atomic-updates': 0,
  },

  overrides: [{
    files: ['**/*.test.js'],
    env: {
      mocha: true,
    },
    globals: {
      expect: true,
      sinon: true,
    },
    rules: {
      'max-nested-callbacks': ['warn', 6],
    },
  }],
}
