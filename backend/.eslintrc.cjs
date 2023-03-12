// eslint-disable-next-line no-undef
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'space-before-function-paren': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'no-multi-spaces': ['error'],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
    '@typescript-eslint/semi': ['error'],
    'object-curly-spacing': ['error', 'always']
  },
};
