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
  addDocker,
} from 'src/steps'
import { validator } from 'src/services/validator'

const main = async () => {
  logger.info(
    `This app generator is built on top of Create React App (${chalk.blue(
      'https://github.com/facebook/create-react-app'
    )}.`
  )

  // 1. Project name and folder
  const { projectFolder } = await prompt({
    name: 'projectFolder',
    message: 'How do you want to call your project?',
    validate: validator.validateProjectFolder,
  })
  const projectName = words.toCapitalized(projectFolder)

  // 2. Optional Docker
  const { isDocker } = await prompt({
    name: 'isDocker',
    type: 'list',
    message: 'Do you want to generate basic docker 🐳 files?',
    choices: [{ name: 'yes', value: true }, { name: 'no', value: false }],
  })

  const generatorState: IGeneratorState = {
    projectFolder,
    projectName,
    isDocker,
  }

  await checkYarn()
  await checkNpx()

  await initializeCreateReactApp(generatorState)
  await cleanPackageJson(generatorState)
  await addReadme(generatorState)

  if (isDocker) {
    await addDocker(generatorState)
  }

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
