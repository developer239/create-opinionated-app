import chalk from 'chalk'
import { prompt } from 'inquirer'
import { shell } from 'src/services/shell'
import { logger } from 'src/services/log'
import { packageJson } from 'src/services/packageJson'
import { generator } from 'src/generator'

export const checkNpx = async () => {
  const { code } = shell.exec('npx --version')

  if (code !== 0) {
    logger.info(
      `Npx not found. Installing npx on your machine ${chalk.blue(
        'https://github.com/zkat/npx#readme'
      )}`
    )
    await shell.execWithSpinner('npm install -g npx', 'Npx installed')
  }
}

export const initializeCreateReactApp = async () => {
  const { projectName } = await prompt({
    name: 'projectName',
    message: 'How do you want to call your project?',
  })

  await shell.execWithSpinner(
    `npx create-react-app ${projectName}`,
    'Create React App initialized'
  )

  return { projectName }
}

export const cleanPackageJson = (projectName: string) =>
  packageJson.update(
    {
      projectName,
      message: 'Cleaning up package.json',
      messageSuccess: 'package.json cleaned up',
    },
    json => {
      delete json.private
      delete json.browserslist
      delete json.eslintConfig
      delete json.scripts.eject

      return json
    }
  )

export const addEditorConfig = (projectName: string) =>
  generator.runActions(projectName, 'editorconfig')

export const addBrowsersList = (projectName: string) =>
  generator.runActions(projectName, 'browserslist')

export const addPrettier = async (projectName: string) => {
  await packageJson.update(
    {
      projectName,
      message: 'Adding format to scripts',
      messageSuccess: 'format added to scripts',
    },
    json => {
      json.scripts.format = "prettier --write '*/**/*.{ts,tsx,css,md,json}'"

      return json
    }
  )
  await shell.execInProjectWithSpinner(projectName)(
    'yarn add prettier -D',
    'prettier installed'
  )
  await generator.runActions(projectName, 'prettier')
}

export const addEslint = async (projectName: string) => {
  await packageJson.update(
    {
      projectName,
      message: 'Adding lint:ts to scripts',
      messageSuccess: 'lint:ts added to scripts',
    },
    json => {
      json.scripts['lint:ts'] = "eslint 'src/**/*.{ts,tsx}'"

      return json
    }
  )
  await shell.execInProjectWithSpinner(projectName)(
    'yarn add eslint @strv/eslint-config-react @strv/eslint-config-typescript @strv/stylelint-config-styled-components @typescript-eslint/parser eslint-config-prettier eslint-plugin-react-hooks -D',
    'eslint installed'
  )
  await generator.runActions(projectName, 'eslintrc')
}
