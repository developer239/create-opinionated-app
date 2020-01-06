import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'
import { shell } from 'services/shell'
import { state } from 'state'

const moduleName = 'gitHooks'

export const setUpGitHooks = async () => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add husky lint-staged @commitlint/cli @code-quality/commitlint-config -D',
    '[dependencies] install husky, lint-staged, commitlint'
  )

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
