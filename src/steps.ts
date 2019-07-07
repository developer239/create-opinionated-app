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
    '[git] add new files'
  )

  await shell.execInProjectWithSpinner(state.projectFolder)(
    'git commit -m "feat: bootstrap application"',
    '[git] commit changes'
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
    '[create react app] initialize'
  )

  await shell.execInProjectWithSpinner(state.projectFolder)(
    `yarn remove @types/jest @types/node @types/react @types/react-dom && yarn add @types/jest @types/node @types/react @types/react-dom -D`,
    '[dependencies] move @types to devDependencies'
  )

  await shell.execInProjectWithSpinner(state.projectFolder)(
    `yarn add @types/webpack-env -D`,
    '[dependencies] install @types/webpack-env'
  )

  await json.update('tsconfig.json')(
    {
      projectName: state.projectFolder,
      message: '[json] adding baseUrl to tsconfig.json',
      messageSuccess: '[json] add baseUrl to tsconfig.json',
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
      message: '[json] cleaning package.json',
      messageSuccess: '[json] clean package.json',
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
      message: '[json] adding "format" to scripts',
      messageSuccess: '[json] add "format" to scripts',
    },
    jsonFile => {
      jsonFile.scripts.format = "prettier --write '*/**/*.{ts,tsx,css,md,json}'"

      return jsonFile
    }
  )
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add prettier -D',
    '[dependencies] install prettier'
  )
  await generator.runActions(state, '.prettierrc')
}

export const addStyleLint = async (state: IGeneratorState) => {
  await json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: '[json] adding lint:css to scripts',
      messageSuccess: '[json] add "lint:css" to scripts',
    },
    jsonFile => {
      jsonFile.scripts['lint:css'] = "stylelint 'src/**/*.{ts,tsx}'"

      return jsonFile
    }
  )
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add stylelint @strv/stylelint-config-styled-components stylelint-config-prettier -D',
    '[dependencies] install stylelint'
  )
  await generator.runActions(state, '.stylelintrc')
}

export const addEslint = async (state: IGeneratorState) => {
  await json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: '[json] adding "lint:ts" to scripts',
      messageSuccess: '[json] add "lint:ts" to scripts',
    },
    jsonFile => {
      jsonFile.scripts['lint:ts'] = "eslint 'src/**/*.{ts,tsx}'"

      return jsonFile
    }
  )
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add eslint @strv/eslint-config-react @strv/eslint-config-typescript @strv/stylelint-config-styled-components @typescript-eslint/parser eslint-config-prettier eslint-plugin-react-hooks -D',
    '[dependencies] install eslint'
  )
  await generator.runActions(state, '.eslintrc.js')
}

export const addGitHooks = async (state: IGeneratorState) => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add husky lint-staged @commitlint/cli @commitlint/config-conventional -D',
    '[dependencies] install husky, lint-staged, commitlint'
  )
  await generator.runActions(state, 'commitlint.config.js')
  await generator.runActions(state, '.huskyrc')
  await generator.runActions(state, '.lintstagedrc')
}

export const addBasicProjectFiles = async (state: IGeneratorState) => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'rm -r src/*',
    '[fs] remove old project structure'
  )
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add styled-components && yarn add @types/styled-components jest-styled-components @testing-library/react -D',
    '[dependencies] install styled-components, jest, @testing-library/react'
  )

  await generator.runActions(state, '.env')
  await generator.runActions(state, 'src')
}

export const addReactRouter = async (state: IGeneratorState) => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add react-router react-router-dom && yarn add @types/react-router-dom -D',
    '[dependencies] install react-router'
  )
  await generator.runActions(state, 'router')
}

export const addRedux = async (state: IGeneratorState) => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add redux react-redux && yarn add @types/redux @types/react-redux -D',
    '[dependencies] install redux'
  )
  await generator.runActions(state, 'redux')
}

export const addApollo = async (state: IGeneratorState) => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add apollo-boost react-apollo graphql',
    '[dependencies] install react-apollo, graphql'
  )
  await generator.runActions(state, 'apollo')
}

export const addDocker = (state: IGeneratorState) =>
  generator.runActions(state, 'docker')

export const addCircleCiConfig = (state: IGeneratorState) =>
  generator.runActions(state, 'circleci')

export const addHerokuConfig = async (state: IGeneratorState) => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add serve',
    '[dependencies] install serve'
  )
  await json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: '[json] adding scripts for integration with Heroku',
      messageSuccess: '[json] add "prod" and "heroku-postbuild" scripts',
    },
    jsonFile => {
      jsonFile.scripts.prod = 'node node_modules/.bin/serve -s build'
      jsonFile.scripts['heroku-postbuild'] = 'npm run build'

      return jsonFile
    }
  )
  await generator.runActions(state, 'heroku')
}
