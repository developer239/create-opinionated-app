import { shell } from 'services/shell'
import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'
import { json } from 'services/json'
import { addDependencies, removeFiles } from 'services/exec'

export const moduleName = '_ReactNative'

interface IContext {
  projectFolder: string
}

export const initReactNativeApp = async (context: IContext) => {
  await shell.execWithSpinner(
    `npx react-native init ${context.projectFolder}`,
    '[react-native-app] initialized',
  )
  await removeFiles('default project files', [
    '.eslintrc.js',
    '.flowconfig',
    '.prettierrc.js',
    'App.js',
    'babel.config.js',
    'index.js'
  ])

  await json.update('package.json')(
    {
      projectName: context.projectFolder,
      message: '[json] cleaning package.json',
      messageSuccess: '[json] clean package.json',
    },
    jsonFile => ({
      ...jsonFile,
      scripts: {
        ...jsonFile.scripts,
        'start': 'react-native start --reset-cache',
        'start:android': 'react-native run-android',
        'start:ios': 'react-native run-ios',
        'test': 'jest',
      },
    }),
  )

  await addDependencies('styled-components', ['styled-components'])
  await addDependencies('types and test tools', [
    'typescript',
    'babel-plugin-inline-import',
    'metro-react-native-babel-preset',
    '@types/jest @types/react',
    '@types/react-native',
    '@types/react-test-renderer',
    '@testing-library/react-native',
    '@types/node @types/styled-components',
    'babel-plugin-module-resolver',
  ], true)

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
