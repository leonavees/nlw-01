module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'prettier',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
    },
    plugins: [
        '@typescript-eslint',
        'prettier'
    ],
    rules: {
        'prettier/prettier': 'error',
        'class-methods-use-this': 'off',
        'no-param-reassign': 'off',
        'camelcase': 'off',
        'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }],
        'import/extensions': [0, { 'ts': 'never'}]
    },
    settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
            'typescript': {},
          }
      },
};
