import { shell } from 'services/shell'
import { generate } from 'services/generator'
import { json } from 'services/json'
import { addDependencies, removeDependencies, removeFiles } from 'services/exec'

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
  await removeFiles('__tests__', ['__tests__'], true)

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
  await removeDependencies('react-test-renderer', ['react-test-renderer', '@types/react-test-renderer'])
  await addDependencies('react-native-config', ['react-native-config'])

  await shell.execInProjectWithSpinner(context.projectFolder)('react-native link', 'linked RN dependencies')
  await shell.execInProjectWithSpinner(context.projectFolder)('cd ios && pod install', 'installed pod files')

  await generate({
    name: moduleName,
    source: 'templates',
    destination: '.',
    context: { projectName: context.projectName },
  })
}
