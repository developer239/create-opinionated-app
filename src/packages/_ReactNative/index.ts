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

// eslint-disable-next-line
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
    `npx react-native init ${context.projectFolder} --version 0.61.5`,
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
        'android': undefined,
        'ios': undefined,
        'lint': undefined,
        'start': 'react-native start --reset-cache',
        'start:android': 'react-native run-android',
        'start:ios': 'react-native run-ios',
        'test': 'jest',
      },
    }),
  )

  await json.update('package.json')(
    {
      projectName: context.projectFolder,
      message: '[json] adding detox configuration',
      messageSuccess: '[json] detox configuration',
    },
    jsonFile => ({
      ...jsonFile,
      scripts: {
        ...jsonFile.scripts,
        'detox:build:ios': 'detox build e2e --configuration ios.sim.release',
        'detox:test:ios': 'detox test e2e --configuration ios.sim.release --cleanup --debug-synchronization 200',
        'detox:build:android': 'detox build -c android.emu.debug',
        'detox:test:android': 'detox test -c android.emu.debug',
      },
      'detox': {
        'configurations': {
          'android.emu.debug': {
            'binaryPath': 'android/app/build/outputs/apk/debug/app-debug.apk',
            'build':
              'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
            'type': 'android.emulator',
            'name': 'emu',
          },
          'ios.sim.release': {
            'binaryPath': `ios/build/Build/Products/Release-iphonesimulator/${context.projectFolder}.app`,
            'build': `xcodebuild -workspace ios/${context.projectFolder}.xcworkspace -scheme ${context.projectFolder} -configuration Release -sdk iphonesimulator -derivedDataPath ios/build`,
            'type': 'ios.simulator',
            'name': 'iPhone 8',
          },
        },
        'test-runner': 'jest',
      },
    }),
  )
  await generate({
    name: moduleName,
    source: 'templates/detox-android-test-class',
    destination: `android/app/src/androidTest/java/com/${context.projectFolder}`,
    context,
  })

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
  await addDependencies('detox', ['detox@15.1.4', '@types/detox'], true)

  await generate({
    name: moduleName,
    source: 'templates/base',
    destination: '.',
    context,
  })

  switch (navigationType) {
    case NavigationType.REACT_NAVIGATION:
      await addDependencies('react-navigation', ['react-navigation', 'react-native-reanimated', 'react-native-gesture-handler', 'react-native-screens', 'react-native-safe-area-context', 'react-navigation-stack', 'react-navigation-tabs'])

      await generate({
        name: moduleName,
        source: 'templates/react-navigation',
        destination: '.',
        context,
      })
      break
    case NavigationType.WIX:
      await addDependencies('react-native-navigation', ['react-native-navigation@4.4.0'])

      await generate({
        name: moduleName,
        source: 'templates/react-native-navigation',
        destination: '.',
        context,
      })
      await generate({
        name: moduleName,
        source: 'templates/react-native-navigation-app-delegate-fix',
        destination: `ios/${context.projectFolder}`,
        context,
      })
      await generate({
        name: moduleName,
        source: 'templates/react-native-navigation-main-activity-fix',
        destination: `android/app/src/main/java/com/${context.projectFolder}`,
        context,
      })
      break
  }

  await shell.execInProjectWithSpinner(context.projectFolder)('react-native link', '[exec] link RN dependencies')
  await shell.execInProjectWithSpinner(context.projectFolder)('cd ios && pod install', '[exec] run pod install')
}
