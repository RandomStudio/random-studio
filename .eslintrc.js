module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
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
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'arrow-parens': [1, 'as-needed'],
    'brace-style': [2, '1tbs'],
    curly: [2, 'all'],
    'global-require': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-console': [2, { allow: ['warn', 'error'] }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'object-property-newline': [
      2,
      {
        allowAllPropertiesOnSameLine: false,
      },
    ],
    'padding-line-between-statements': [
      2,
      {
        blankLine: 'always',
        next: '*',
        prev: [
          'case',
          'multiline-block-like',
          'multiline-const',
          'multiline-expression',
          'multiline-let',
          'multiline-var',
        ],
      },
      {
        blankLine: 'always',
        next: [
          'multiline-block-like',
          'multiline-const',
          'multiline-expression',
          'multiline-let',
          'multiline-var',
          'return',
        ],
        prev: '*',
      },
    ],
    'prettier/prettier': [
      2,
      {
        arrowParens: 'avoid',
        endOfLine: 'auto',
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
      },
    ],
    radix: [2, 'as-needed'],
    'react-hooks/exhaustive-deps': 2,
    'react-hooks/rules-of-hooks': 2,
    'react/forbid-dom-props': [1, { forbid: ['onClick' /* , 'className' */] }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-curly-brace-presence': [
      2,
      {
        children: 'ignore',
        props: 'never',
      },
    ],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-literals': [
      2,
      {
        noStrings: false,
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-sort-default-props': [
      2,
      {
        ignoreCase: false,
      },
    ],
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: false,
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: false,
        shorthandFirst: false,
        shorthandLast: false,
      },
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-danger': 0,
    'react/prop-types': 0,
    'react/sort-comp': 0,
    'react/sort-prop-types': [
      2,
      {
        callbacksLast: false,
        ignoreCase: false,
        requiredFirst: false,
        sortShapeProp: false,
      },
    ],
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    // Temporarily disabling prop type rules, due to sheer volume that need fixing
    'sort-keys': [
      2,
      'asc',
      {
        caseSensitive: true,
        natural: false,
      },
    ],
  },
};
