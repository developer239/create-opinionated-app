import chalk from 'chalk'
import { shell } from 'src/services/shell'
import { logger } from 'src/services/log'
import { json } from 'src/services/json'
import { generator } from 'src/generator'

export const addFilesToGit = async (projectName: string) => {
  const { code } = shell.exec('git --version')

  if (code !== 0) {
    return logger.warning('✓ git not found. skipping this step')
  }

  await shell.execInProjectWithSpinner(projectName)(
    'git add .',
    'New files were added to git'
  )

  await shell.execInProjectWithSpinner(projectName)(
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

export const initializeCreateReactApp = async (projectName: string) => {
  await shell.execWithSpinner(
    `npx create-react-app ${projectName} --typescript`,
    'Create React App initialized'
  )

  json.update('tsconfig.json')(
    {
      projectName,
      message: 'Adding baseUrl to tsconfig.json',
      messageSuccess: 'Added baseUrl to tsconfig.json',
    },
    jsonFile => {
      jsonFile.compilerOptions.baseUrl = 'src'

      return jsonFile
    }
  )

  await shell.execInProjectWithSpinner(projectName)(
    `yarn remove @types/jest @types/node @types/react @types/react-dom && yarn add @types/jest @types/node @types/react @types/react-dom -D`,
    '@types moved to devDependencies'
  )
}

export const cleanPackageJson = (projectName: string) =>
  json.update('package.json')(
    {
      projectName,
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

export const addEditorConfig = (projectName: string) =>
  generator.runActions(projectName, '.editorconfig')

export const addBrowsersList = (projectName: string) =>
  generator.runActions(projectName, '.browserslistrc')

export const addPrettier = async (projectName: string) => {
  await json.update('package.json')(
    {
      projectName,
      message: 'Adding format to scripts',
      messageSuccess: 'format added to scripts',
    },
    jsonFile => {
      jsonFile.scripts.format = "prettier --write '*/**/*.{ts,tsx,css,md,json}'"

      return jsonFile
    }
  )
  await shell.execInProjectWithSpinner(projectName)(
    'yarn add prettier -D',
    'prettier installed'
  )
  await generator.runActions(projectName, '.prettierrc')
}

export const addStyleLint = async (projectName: string) => {
  await json.update('package.json')(
    {
      projectName,
      message: 'Adding lint:css to scripts',
      messageSuccess: 'lint:css added to scripts',
    },
    jsonFile => {
      jsonFile.scripts['lint:css'] = "stylelint 'src/**/*.{ts,tsx}'"

      return jsonFile
    }
  )
  await shell.execInProjectWithSpinner(projectName)(
    'yarn add stylelint @strv/stylelint-config-styled-components stylelint-config-prettier -D',
    'stylelint installed'
  )
  await generator.runActions(projectName, '.stylelintrc')
}

export const addEslint = async (projectName: string) => {
  await json.update('package.json')(
    {
      projectName,
      message: 'Adding lint:ts to scripts',
      messageSuccess: 'lint:ts added to scripts',
    },
    jsonFile => {
      jsonFile.scripts['lint:ts'] = "eslint 'src/**/*.{ts,tsx}'"

      return jsonFile
    }
  )
  await shell.execInProjectWithSpinner(projectName)(
    'yarn add eslint @strv/eslint-config-react @strv/eslint-config-typescript @strv/stylelint-config-styled-components @typescript-eslint/parser eslint-config-prettier eslint-plugin-react-hooks -D',
    'eslint installed'
  )
  await generator.runActions(projectName, '.eslintrc.js')
}

export const addGitHooks = async (projectName: string) => {
  await shell.execInProjectWithSpinner(projectName)(
    'yarn add husky lint-staged @commitlint/cli @commitlint/config-conventional -D',
    'eslint installed'
  )
  await generator.runActions(projectName, 'commitlint.config.js')
  await generator.runActions(projectName, '.huskyrc')
  await generator.runActions(projectName, '.lintstagedrc')
}

export const addBasicProjectFiles = async (projectName: string) => {
  await shell.execInProjectWithSpinner(projectName)(
    'rm -r src/*',
    'Old project structure removed'
  )
  await shell.execInProjectWithSpinner(projectName)(
    'yarn add react-router react-router-dom styled-components && yarn add @types/react-router-dom @types/styled-components jest-styled-components @testing-library/react -D',
    'Essential libraries installed'
  )

  await generator.runActions(projectName, '.env')
  await generator.runActions(projectName, 'src')
}
