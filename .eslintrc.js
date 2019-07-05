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
    'import/group-exports': 0,
    'node/no-unsupported-features/es-syntax': 0,
  },
}
