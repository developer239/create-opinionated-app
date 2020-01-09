import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'
import { addDependencies } from 'services/exec'

const moduleName = 'git'

export const setUpGitHooks = async () => {
  await addDependencies('git hooks', [
    'husky',
    'lint-staged',
    '@commitlint/cli',
    '@code-quality/commitlint-config',
  ], true)

  await generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'commitlint.config.js',
        data: loadTemplate([moduleName, 'templates', 'commitlint.config.js.hbs']),
        destination: ['commitlint.config.js'],
      },
      {
        name: 'huskyrc',
        data: loadTemplate([moduleName, 'templates', 'huskyrc.hbs']),
        destination: ['.huskyrc'],
      },
      {
        name: 'lintstagedrc',
        data: loadTemplate([moduleName, 'templates', 'lintstagedrc.hbs']),
        destination: ['.lintstagedrc'],
      },
    ],
  })
}
