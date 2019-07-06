module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'typescript',
    'import',
  ],
  extends: [
    '@strv/node/v10',
    '@strv/node/style',
    '@strv/node/optional',
    '@strv/typescript',
    '@strv/typescript/style',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      'typescript': {},
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0,
    'import/group-exports': 0,
    'node/no-unsupported-features/es-syntax': 0,
  },
}
