import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'
import { ProjectType } from 'state.types'
import { state } from 'state'
import { json } from 'services/json'
import { shell } from 'services/shell'

const moduleName = 'eslint'

export const addForMobile = async () => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add eslint eslint-plugin-import @code-quality/eslint-config-react-native @code-quality/eslint-config-typescript eslint-config-prettier -D',
    '[dependencies] install eslint',
  )

  return generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'eslintrc.js',
        data: loadTemplate([moduleName, 'templates', 'mobile', 'eslintrc.js.hbs']),
        destination: ['.eslintrc.js'],
      },
    ],
  })
}

export const addForWb = async () => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add eslint eslint-plugin-import @code-quality/eslint-config-react @code-quality/eslint-config-typescript eslint-config-prettier -D',
    '[dependencies] install eslint',
  )

  return generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'eslintrc.js',
        data: loadTemplate([moduleName, 'templates', 'web', 'eslintrc.js.hbs']),
        destination: ['.eslintrc.js'],
      },
    ],
  })
}

export const addEslint = async () => {
  await json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: '[json] adding "lint:ts" to scripts',
      messageSuccess: '[json] add "lint:ts" to scripts',
    },
    jsonFile => {
      jsonFile.scripts['lint:ts'] = state.projectType === ProjectType.NEXT ? 'eslint --ext .ts,.tsx pages' : 'eslint --ext .ts,.tsx src'

      return jsonFile
    },
  )

  if (state.projectType === ProjectType.RN) {
    await addForMobile()
  } else {
    await addForWb()
  }
}
