module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'arrow-parens': [1, 'as-needed'],
    'no-console': [2, { 'allow': ['warn', 'error' ] }],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'padding-line-between-statements': [
      'error',
      {
        'blankLine': 'always',
        'prev': '*',
        'next': ['return', 'export', 'block', 'block-like', 'case', 'default']
      }
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-curly-brace-presence': [2, { 'props': 'never', 'children': 'always' }],
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    // Temporarily disabling prop type rules, due to sheer volume that need fixing
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
