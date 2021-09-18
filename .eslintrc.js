module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/prop-types': 0,
    'no-unused-vars': 0,
    'import/no-extraneous-dependencies': 0,
    'no-console': 0,
    'linebreak-style': 0,
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
  },
};
