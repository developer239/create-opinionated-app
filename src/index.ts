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
  addCircleCiConfig,
  addHerokuConfig,
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

  // 3. CI
  const { ciService } = await prompt({
    name: 'ciService',
    type: 'list',
    message: 'What continuous integration service do you want to use?',
    choices: [
      { name: 'CircleCi', value: 'circleCi' },
      { name: 'none 🚫', value: 'none' },
    ],
  })

  // 4. CD
  const { cdService } = await prompt({
    name: 'cdService',
    type: 'list',
    message: 'What hosting do you want to use?',
    choices: [
      { name: 'Heroku', value: 'heroku' },
      { name: 'none 🚫', value: 'none' },
    ],
  })

  const generatorState: IGeneratorState = {
    projectFolder,
    projectName,
    isDocker,
    isHeroku: cdService === 'heroku',
  }

  await checkYarn()
  await checkNpx()

  await initializeCreateReactApp(generatorState)
  await cleanPackageJson(generatorState)
  await addReadme(generatorState)

  if (ciService === 'circleCi') {
    await addCircleCiConfig(generatorState)
  }

  if (cdService === 'heroku') {
    await addHerokuConfig(generatorState)
  }

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
