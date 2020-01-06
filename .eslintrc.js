module.exports = {
  extends: [
    '@code-quality/eslint-config-node',
    '@code-quality/eslint-config-typescript',
    'prettier',
    'prettier/react'
  ],
  rules: {
    'security/detect-non-literal-fs-filename': 1
  }
}
