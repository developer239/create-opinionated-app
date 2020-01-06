import { shell } from 'services/shell'
import { state } from 'state'
import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'
import { json } from 'services/json'

export const moduleName = 'reactnativeapp'

export const initReactNativeApp = async () => {
  await shell.execWithSpinner(
    `npx react-native init ${state.projectFolder}`,
    '[react-native-app] initialized',
  )
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'rm .eslintrc.js .flowconfig .prettierrc.js App.js babel.config.js index.js',
    '[fs] remove unnecessary project files',
  )

  await json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: '[json] cleaning package.json',
      messageSuccess: '[json] clean package.json',
    },
    jsonFile => {
      jsonFile.scripts = {}
      jsonFile.scripts.start = 'react-native start --reset-cache'
      jsonFile.scripts['start:android'] = 'react-native run-android'
      jsonFile.scripts['start:ios'] = 'react-native run-ios'
      jsonFile.scripts.test = 'jest'

      return jsonFile
    },
  )

  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add styled-components',
    '[dependencies] install initial dependencies',
  )

  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add typescript babel-plugin-inline-import metro-react-native-babel-preset @types/jest @types/react @types/react-native @types/react-test-renderer @testing-library/react-native @types/node @types/styled-components babel-plugin-module-resolver -D',
    '[dependencies] install initial devDependencies',
  )

  await generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'jest.config.js',
        data: loadTemplate([moduleName, 'templates', 'jest.config.js.hbs']),
        destination: ['jest.config.js'],
      },
      {
        name: 'tsconfig.json',
        data: loadTemplate([moduleName, 'templates', 'tsconfig.json.hbs']),
        destination: ['tsconfig.json'],
      },
      {
        name: 'babel.config.js',
        data: loadTemplate([moduleName, 'templates', 'babel.config.js.hbs']),
        destination: ['babel.config.js'],
      },
      {
        name: 'index.js',
        data: loadTemplate([moduleName, 'templates', 'index.js.hbs']),
        destination: ['index.js'],
      },
      {
        name: 'App.tsx',
        data: loadTemplate([moduleName, 'templates', 'src', 'App.tsx.hbs']),
        destination: ['src', 'App.tsx'],
      },
    ],
  })
}
