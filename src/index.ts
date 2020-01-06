import { prompt } from 'inquirer'
import * as chalk from 'chalk'
import { capitalizeAll, toAlphaNumeric } from 'services/text'
import { validator } from 'services/validator'
import { createReactApp } from 'projects/createReactApp'
import { state } from 'state'
import { logger } from 'services/log'
import { ProjectType } from 'state.types'
import { createNextJsApp } from 'projects/nextJsApp'
import { checkYarn } from 'packages/yarn'
import { checkNpx } from 'packages/npx'
import { createReactNativeApp } from 'projects/reactNativeApp'

const main = async () => {
  // Project Name
  const { projectFolder: rawProjectFolder } = await prompt({
    name: 'projectFolder',
    message: 'How do you want to call your project?',
    validate: validator.validateProjectFolder,
  })
  state.projectFolder = rawProjectFolder.toLowerCase()
  state.projectName = capitalizeAll(rawProjectFolder)

  // Project Type
  const { projectType } = await prompt({
    name: 'projectType',
    type: 'list',
    message: 'What type of application would you like to create?',
    choices: [
      { name: 'Create React App', value: ProjectType.CRA },
      { name: 'NextJs App', value: ProjectType.NEXT },
      { name: 'React Native App', value: ProjectType.RN },
    ],
  })
  state.projectType = projectType

  if (projectType === ProjectType.RN) {
    state.projectFolder = toAlphaNumeric(state.projectFolder)
  }

  await checkYarn()
  await checkNpx()

  if(projectType === ProjectType.CRA) {
    await createReactApp()
  }

  if(projectType === ProjectType.NEXT) {
    await createNextJsApp()
  }

  if (projectType === ProjectType.RN) {
    await createReactNativeApp()
  }

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
        `./${state.projectFolder}`
      )}`
    )
  )
}

main().catch(() => logger.log('failed to run generator'))
