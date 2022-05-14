module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:@next/next/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off'
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
