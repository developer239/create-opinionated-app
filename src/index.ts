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
  addReactRouter,
  addRedux,
  addApollo,
} from 'src/steps'
import { validator } from 'src/services/validator'

const main = async () => {
  logger.info(
    `This app generator is built on top of Create React App (${chalk.blue(
      'https://github.com/facebook/create-react-app'
    )}.`
  )

  // 1. Project name and folder
  const { projectFolder: rawProjectFolder } = await prompt({
    name: 'projectFolder',
    message: 'How do you want to call your project?',
    validate: validator.validateProjectFolder,
  })
  const projectFolder = rawProjectFolder.toLowerCase()
  const projectName = words.toCapitalized(rawProjectFolder)

  // 2. Router
  const { isRouter } = await prompt({
    name: 'isRouter',
    type: 'list',
    message: 'Dou you want to install react-router?',
    choices: [{ name: 'yes', value: true }, { name: 'no', value: false }],
  })

  // 3. State Management
  const { stateManagement } = await prompt({
    name: 'stateManagement',
    type: 'list',
    message: 'What library do you want to use to manage state?',
    choices: [
      { name: 'Redux', value: 'redux' },
      { name: 'Apollo GraphQL', value: 'apollo' },
      { name: 'none 🚫', value: 'none' },
    ],
  })

  // 4. Docker
  const { isDocker } = await prompt({
    name: 'isDocker',
    type: 'list',
    message: 'Do you want to use docker 🐳?',
    choices: [{ name: 'yes', value: true }, { name: 'no', value: false }],
  })

  // 5. CI
  const { ciService } = await prompt({
    name: 'ciService',
    type: 'list',
    message: 'What CI service do you want to use?',
    choices: [
      { name: 'CircleCi', value: 'circleCi' },
      { name: 'none 🚫', value: 'none' },
    ],
  })

  // 6. CD
  const { cdService } = await prompt({
    name: 'cdService',
    type: 'list',
    message: 'What hosting service do you want to use?',
    choices: [
      { name: 'Heroku', value: 'heroku' },
      { name: 'none 🚫', value: 'none' },
    ],
  })

  const generatorState: IGeneratorState = {
    projectFolder,
    projectName,
    isDocker,
    isRouter,
    // TODO: Write handle bars helpers for better conditional rendering
    isRedux: stateManagement === 'redux',
    isApollo: stateManagement === 'apollo',
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

  if (isRouter) {
    await addReactRouter(generatorState)
  }

  if (stateManagement === 'redux') {
    await addRedux(generatorState)
  }

  if (stateManagement === 'apollo') {
    await addApollo(generatorState)
  }

  await addFilesToGit(generatorState)

  logger.info(
    chalk.green(
      ` _____ _   _ ______ _____  _____ _____ _____ 
/  ___| | | /  __ \\/  __ \\|  ___/  ___/  ___|
\\ \`--.| | | | /  \\/| /  \\/| |__ \\ \`--.\\ \`--. 
 \`--. \\ | | | |    | |    |  __| \`--. \\\`--. \\
/\\__/ / |_| | \\__/\\| \\__/\\| |___/\\__/ /\\__/ /
\\____/ \\___/ \\____/ \\____/\\____/\\____/\\____/ 
`
    )
  )
  logger.info(
    chalk.bold(
      `Your new application lives in ${chalk.underline.green(
        `./${projectFolder}`
      )}`
    )
  )
}

main()
