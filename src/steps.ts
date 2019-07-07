import chalk from 'chalk'
import { IGeneratorState } from './index.types'
import { shell } from 'src/services/shell'
import { logger } from 'src/services/log'
import { json } from 'src/services/json'
import { generator } from 'src/generator'

export const addFilesToGit = async (state: IGeneratorState) => {
  const { code } = shell.exec('git --version')

  if (code !== 0) {
    return logger.warning('✓ git not found. skipping this step')
  }

  await shell.execInProjectWithSpinner(state.projectFolder)(
    'git add .',
    'New files were added to git'
  )

  await shell.execInProjectWithSpinner(state.projectFolder)(
    'git commit -m "feat: bootstrap application"',
    'Changes were checked to version control.'
  )
}

export const checkYarn = async () => {
  const { code } = shell.exec('yarn --version')

  if (code !== 0) {
    logger.info(
      `Yarn not found. Installing yarn on your machine ${chalk.blue(
        'https://github.com/yarnpkg/yarn'
      )}`
    )
    await shell.execWithSpinner('npm install -g yarn', 'yarn installed')
  }
}

export const checkNpx = async () => {
  const { code } = shell.exec('npx --version')

  if (code !== 0) {
    logger.info(
      `Npx not found. Installing npx on your machine ${chalk.blue(
        'https://github.com/zkat/npx'
      )}`
    )
    await shell.execWithSpinner('npm install -g npx', 'npx installed')
  }
}

export const initializeCreateReactApp = async (state: IGeneratorState) => {
  await shell.execWithSpinner(
    `npx create-react-app ${state.projectFolder} --typescript`,
    'Create React App initialized'
  )

  await shell.execInProjectWithSpinner(state.projectFolder)(
    `yarn remove @types/jest @types/node @types/react @types/react-dom && yarn add @types/jest @types/node @types/react @types/react-dom -D`,
    '@types moved to devDependencies'
  )

  await shell.execInProjectWithSpinner(state.projectFolder)(
    `yarn add @types/webpack-env -D`,
    '@types/webpack-env installed'
  )

  await json.update('tsconfig.json')(
    {
      projectName: state.projectFolder,
      message: 'Adding baseUrl to tsconfig.json',
      messageSuccess: 'Added baseUrl to tsconfig.json',
    },
    jsonFile => {
      jsonFile.compilerOptions.baseUrl = 'src'

      return jsonFile
    }
  )
}

export const addReadme = async (state: IGeneratorState) => {
  await shell.execInProject(state.projectFolder)('rm README.md')
  await generator.runActions(state, 'README.md')
}

export const cleanPackageJson = (state: IGeneratorState) =>
  json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: 'Cleaning up package.json',
      messageSuccess: 'package.json cleaned up',
    },
    jsonFile => {
      delete jsonFile.private
      delete jsonFile.browserslist
      delete jsonFile.eslintConfig
      delete jsonFile.scripts.eject

      return jsonFile
    }
  )

export const addEditorConfig = (state: IGeneratorState) =>
  generator.runActions(state, '.editorconfig')

export const addBrowsersList = (state: IGeneratorState) =>
  generator.runActions(state, '.browserslistrc')

export const addPrettier = async (state: IGeneratorState) => {
  await json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: 'Adding format to scripts',
      messageSuccess: 'format added to scripts',
    },
    jsonFile => {
      jsonFile.scripts.format = "prettier --write '*/**/*.{ts,tsx,css,md,json}'"

      return jsonFile
    }
  )
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add prettier -D',
    'prettier installed'
  )
  await generator.runActions(state, '.prettierrc')
}

export const addStyleLint = async (state: IGeneratorState) => {
  await json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: 'Adding lint:css to scripts',
      messageSuccess: 'lint:css added to scripts',
    },
    jsonFile => {
      jsonFile.scripts['lint:css'] = "stylelint 'src/**/*.{ts,tsx}'"

      return jsonFile
    }
  )
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add stylelint @strv/stylelint-config-styled-components stylelint-config-prettier -D',
    'stylelint installed'
  )
  await generator.runActions(state, '.stylelintrc')
}

export const addEslint = async (state: IGeneratorState) => {
  await json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: 'Adding lint:ts to scripts',
      messageSuccess: 'lint:ts added to scripts',
    },
    jsonFile => {
      jsonFile.scripts['lint:ts'] = "eslint 'src/**/*.{ts,tsx}'"

      return jsonFile
    }
  )
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add eslint @strv/eslint-config-react @strv/eslint-config-typescript @strv/stylelint-config-styled-components @typescript-eslint/parser eslint-config-prettier eslint-plugin-react-hooks -D',
    'eslint installed'
  )
  await generator.runActions(state, '.eslintrc.js')
}

export const addGitHooks = async (state: IGeneratorState) => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add husky lint-staged @commitlint/cli @commitlint/config-conventional -D',
    'eslint installed'
  )
  await generator.runActions(state, 'commitlint.config.js')
  await generator.runActions(state, '.huskyrc')
  await generator.runActions(state, '.lintstagedrc')
}

export const addBasicProjectFiles = async (state: IGeneratorState) => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'rm -r src/*',
    'Old project structure removed'
  )
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add styled-components && yarn add @types/styled-components jest-styled-components @testing-library/react -D',
    'Essential libraries installed'
  )

  await generator.runActions(state, '.env')
  await generator.runActions(state, 'src')
}

export const addReactRouter = async (state: IGeneratorState) => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add react-router react-router-dom && yarn add @types/react-router-dom -D',
    'React Router installed'
  )
  await generator.runActions(state, 'router')
}

export const addDocker = (state: IGeneratorState) =>
  generator.runActions(state, 'docker')

export const addCircleCiConfig = (state: IGeneratorState) =>
  generator.runActions(state, 'circleci')

export const addHerokuConfig = async (state: IGeneratorState) => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add serve',
    'serve server added'
  )
  await json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: 'Adding scripts for integration with Heroku',
      messageSuccess: 'Added prod and heroku-postbuild scripts',
    },
    jsonFile => {
      jsonFile.scripts.prod = 'node node_modules/.bin/serve -s build'
      jsonFile.scripts['heroku-postbuild'] = 'npm run build'

      return jsonFile
    }
  )
  await generator.runActions(state, 'heroku')
}
