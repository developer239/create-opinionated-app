import { prompt } from 'inquirer'
import figlet from 'figlet'
import * as chalk from 'chalk'
import { capitalizeAll, toAlphaNumeric } from 'services/text'
import { validator } from 'services/validator'
import { createReactApp } from 'projects/createReactApp'
import { logger } from 'services/log'
import { createNextJsApp } from 'projects/nextJsApp'
import { checkYarn } from 'services/dependencyCheck/yarn'
import { checkNpx } from 'services/dependencyCheck/npx'
import { createReactNativeApp } from 'projects/reactNativeApp'
import { AppType, ProjectType } from 'state.types'
import { state } from 'state'
import { createNestJsApp } from './projects/nestJsApp'

const main = async () => {
  logger.info(chalk.green(figlet.textSync('Create App')))

  const { projectType } = await prompt({
    name: 'projectType',
    type: 'list',
    message: 'What type of application would you like to create?',
    choices: [
      { name: 'Create React App', value: ProjectType.CRA },
      { name: 'Next.js', value: ProjectType.NEXT },
      { name: 'React Native', value: ProjectType.RN },
      { name: 'Nest.js', value: ProjectType.NEST },
    ],
  })
  state.projectType = projectType

  const { projectFolder: rawProjectFolder } = await prompt({
    name: 'projectFolder',
    message: 'How do you want to call your project?',
    validate: validator.validateProjectFolder,
  })
  state.projectName = capitalizeAll(rawProjectFolder)
  state.projectFolder = rawProjectFolder.toLowerCase()

  if (projectType === ProjectType.RN) {
    state.projectFolder = toAlphaNumeric(state.projectFolder)
  }

  await checkYarn()
  await checkNpx()

  switch (projectType) {
    case ProjectType.CRA:
      state.appType = AppType.WEB
      await createReactApp(state)
      break
    case ProjectType.NEXT:
      state.appType = AppType.WEB
      await createNextJsApp(state)
      break
    case ProjectType.RN:
      state.appType = AppType.MOBILE
      await createReactNativeApp(state)
      break
    case ProjectType.NEST:
      state.appType = AppType.NODE
      await createNestJsApp(state)
      break
  }

  logger.info(chalk.green(figlet.textSync('Success', { horizontalLayout: 'full' })))
  logger.info(
    chalk.bold(
      `Your new application lives in ${chalk.underline.green(
        `./${state.projectFolder}`,
      )}`,
    ),
  )
}

main().catch((error) => logger.warning(`[main] Failed to run generator: ${error}`))
