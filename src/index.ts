import { prompt } from 'inquirer'
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

const main = async () => {
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
  state.appType = projectType === ProjectType.RN ? AppType.MOBILE : AppType.WEB

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
      await createReactApp(state)
      break
    case ProjectType.NEXT:
      await createNextJsApp(state)
      break
    case ProjectType.RN:
      await createReactNativeApp(state)
      break
  }

  logger.info(
    chalk.green(
      ` _____ _   _ ______ _____  _____ _____ _____ 
/  ___| | | /  __ \\/  __ \\|  ___/  ___/  ___|
\\ \`--.| | | | /  \\/| /  \\/| |__ \\ \`--.\\ \`--. 
 \`--. \\ | | | |    | |    |  __| \`--. \\\`--. \\
/\\__/ / |_| | \\__/\\| \\__/\\| |___/\\__/ /\\__/ /
\\____/ \\___/ \\____/ \\____/\\____/\\____/\\____/ 
`,
    ),
  )
  logger.info(
    chalk.bold(
      `Your new application lives in ${chalk.underline.green(
        `./${state.projectFolder}`,
      )}`,
    ),
  )
}

main().catch((error) => logger.warning(`[main] Failed to run generator: ${error}`))
