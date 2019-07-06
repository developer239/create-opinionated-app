import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { prompt } from 'inquirer'
import { IGeneratorState } from './index.types'
import { logger } from 'src/services/log'
import { words } from 'src/services/words'
import {
  cleanPackageJson,
  addBrowsersList,
  addEditorConfig,
  initializeCreateReactApp,
  checkNpx,
  addEslint,
  addPrettier,
  addStyleLint,
  addGitHooks,
  checkYarn,
  addFilesToGit,
  addBasicProjectFiles,
  addReadme,
} from 'src/steps'

const main = async () => {
  logger.info(
    `This app generator is built on top of Create React App (${chalk.blue(
      'https://github.com/facebook/create-react-app'
    )}.`
  )

  const { projectFolder } = await prompt({
    name: 'projectFolder',
    message: 'How do you want to call your project?',
    validate: (value: string) => {
      const validateName = require('validate-npm-package-name')

      const { errors } = validateName(value)

      if (errors) {
        return 'Invalid name.'
      }

      if (fs.existsSync(path.resolve(value))) {
        return 'Project with this name already exists.'
      }

      return true
    },
  })
  const projectName = words.toCapitalized(projectFolder)

  const generatorState: IGeneratorState = {
    projectFolder,
    projectName,
  }

  await checkYarn()
  await checkNpx()

  await initializeCreateReactApp(generatorState)
  await cleanPackageJson(generatorState)
  await addReadme(generatorState)

  await addEditorConfig(generatorState)
  await addBrowsersList(generatorState)
  await addPrettier(generatorState)
  await addStyleLint(generatorState)
  await addEslint(generatorState)
  await addGitHooks(generatorState)
  await addBasicProjectFiles(generatorState)
  await addFilesToGit(generatorState)
}

main()
