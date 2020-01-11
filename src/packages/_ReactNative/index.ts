import { prompt } from 'inquirer'
import { shell } from 'services/shell'
import { generate } from 'services/generator'
import { json } from 'services/json'
import { addDependencies, removeDependencies, removeFiles } from 'services/exec'

export const moduleName = '_ReactNative'

interface IContext {
  projectFolder: string
  projectName: string
}

enum NavigationType {
  NONE = 'NONE',
  WIX = 'WIX',
  REACT_NAVIGATION = 'REACT_NAVIGATION',
}

export const initReactNativeApp = async (context: IContext) => {
  const { navigationType } = await prompt({
    name: 'navigationType',
    type: 'list',
    message: 'Do you want to use navigation?',
    choices: [
      { name: 'None', value: NavigationType.NONE },
      { name: 'React Native Navigation (WIX)', value: NavigationType.WIX },
      { name: 'React Navigation', value: NavigationType.REACT_NAVIGATION },
    ],
  })

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
    'index.js',
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

  await generate({
    name: moduleName,
    source: 'templates/base',
    destination: '.',
    context: { projectName: context.projectName },
  })

  switch (navigationType) {
    case NavigationType.REACT_NAVIGATION:
      await addDependencies('react-navigation', ['react-navigation', 'react-native-reanimated', 'react-native-gesture-handler', 'react-native-screens', 'react-native-safe-area-context', 'react-navigation-stack', 'react-navigation-tabs'])

      await generate({
        name: moduleName,
        source: 'templates/react-navigation',
        destination: '.',
        context: { projectName: context.projectName },
      })
      break
  }

  await shell.execInProjectWithSpinner(context.projectFolder)('react-native link', '[exec] link RN dependencies')
  await shell.execInProjectWithSpinner(context.projectFolder)('cd ios && pod install', '[exec] run pod install')
}
