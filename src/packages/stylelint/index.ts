import { ProjectType } from 'state.types'
import { state } from 'state'
import { json } from 'services/json'
import { shell } from 'services/shell'
import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'

const moduleName = 'stylelint'

export const addForMobile = async () => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add stylelint prettier @code-quality/stylelint-styled-components-react-native-config stylelint-config-prettier -D',
    '[dependencies] install stylelint'
  )

  return generate({
    name: 'stylelintrc.js',
    templateFiles: [
      {
        name: 'stylelintrc.js',
        data: loadTemplate([moduleName, 'templates', 'mobile', 'stylelintrc.js.hbs']),
        destination: ['.stylelintrc.js'],
      },
    ],
  })
}

export const addForWeb = async () => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add stylelint prettier @code-quality/stylelint-styled-components-config stylelint-config-prettier -D',
    '[dependencies] install stylelint'
  )

  return generate({
    name: 'stylelintrc.js',
    templateFiles: [
      {
        name: 'stylelintrc.js',
        data: loadTemplate([moduleName, 'templates', 'web', 'stylelintrc.js.hbs']),
        destination: ['.stylelintrc.js'],
      },
    ],
  })
}

export const addStylelint = async () => {
  await json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: '[json] adding lint:css to scripts',
      messageSuccess: '[json] add "lint:css" to scripts',
    },
    jsonFile => {
      jsonFile.scripts['lint:css'] = state.projectType === ProjectType.NEXT ? "stylelint 'pages/**/*.{ts,tsx}'" : "stylelint '**/*.{ts,tsx}'"

      return jsonFile
    }
  )

  if (state.projectType === ProjectType.RN) {
    await addForMobile()
  } else {
    await addForWeb()
  }
}
