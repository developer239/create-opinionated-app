module.exports = {
  extends: [
    '@code-quality/eslint-config-node',
    '@code-quality/eslint-config-typescript',
    'prettier',
    'prettier/react'
  ],
  rules: {
    'security/detect-non-literal-fs-filename': 1,
    'default-case': 1,
    'import/order': ['error', { 'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'] }],
    'max-lines-per-function': ['error', 90],
    '@typescript-eslint/triple-slash-reference': 0
  }
}
