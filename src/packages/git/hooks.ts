import { generate } from 'services/generator'
import { addDependencies } from 'services/exec'

const moduleName = 'git'

export const setUpGitHooks = async () => {
  await addDependencies('git hooks', [
    'husky',
    'lint-staged',
    '@commitlint/cli',
    '@code-quality/commitlint-config',
  ], true)

  return generate({
    name: moduleName,
    source: 'templates',
    destination: '.',
  })
}
