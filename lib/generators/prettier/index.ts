import { state } from 'state'
import { json } from 'services/json'
import { shell } from 'services/shell'
import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'

const moduleName = 'prettier'

export const addPrettier = async () => {
  await json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: '[json] adding "format" to scripts',
      messageSuccess: '[json] add "format" to scripts',
    },
    jsonFile => {
      jsonFile.scripts.format = "prettier --write '*/**/*.{ts,tsx,css,md,json}'"

      return jsonFile
    }
  )

  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add prettier @code-quality/prettier-config -D',
    '[dependencies] install prettier'
  )

  await generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'prettierrc.js',
        data: loadTemplate([moduleName, 'templates', 'prettierrc.js.hbs']),
        destination: ['.prettierrc.js'],
      },
    ],
  })
}
