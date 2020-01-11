import { shell } from 'services/shell'
import { generate } from 'services/generator'
import { json } from 'services/json'
import { addDependencies, removeFiles } from 'services/exec'

export const moduleName = '_ReactNative'

interface IContext {
  projectFolder: string
  projectName: string
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
    source: 'tempaltes',
    destination: '.',
    context: { projectName: context.projectName },
  })
}
