import chalk from 'chalk'
import { prompt } from 'inquirer'
import { logger } from 'src/services/log'
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
} from 'src/steps'

const main = async () => {
  logger.info(
    `This app generator is built on top of Create React App (${chalk.blue(
      'https://github.com/facebook/create-react-app'
    )}.`
  )

  const { projectName } = await prompt({
    name: 'projectName',
    message: 'How do you want to call your project?',
  })

  await checkYarn()
  await checkNpx()

  await initializeCreateReactApp(projectName)
  await cleanPackageJson(projectName)

  await addEditorConfig(projectName)
  await addBrowsersList(projectName)
  await addPrettier(projectName)
  await addStyleLint(projectName)
  await addEslint(projectName)
  await addGitHooks(projectName)
  await addFilesToGit(projectName)
}

main()
