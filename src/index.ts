import chalk from 'chalk'
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
} from 'src/steps'

const main = async () => {
  logger.info(
    `This app generator is built on top of Create React App (${chalk.blue(
      'https://github.com/facebook/create-react-app'
    )}.`
  )

  await checkNpx()

  const { projectName } = await initializeCreateReactApp()
  await cleanPackageJson(projectName)

  await addEditorConfig(projectName)
  await addBrowsersList(projectName)
  await addPrettier(projectName)
  await addStyleLint(projectName)
  await addEslint(projectName)
  await addGitHooks(projectName)
}

main()
