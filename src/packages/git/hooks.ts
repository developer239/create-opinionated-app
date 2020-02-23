import { addDependencies } from 'services/exec'
import { generate } from 'services/generator'
import { AppType } from 'state.types'

const moduleName = 'git'

interface IContext {
  appType: AppType
}

export const setUpGitHooks = async (context: IContext) => {
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
    context: {
      isStylelint: context.appType !== AppType.NODE,
    },
  })
}
