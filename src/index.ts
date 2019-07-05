import chalk from 'chalk'
import { logger } from 'src/services/log'
import { initializeCreateReactApp, installNpx } from 'src/steps'

const main = async () => {
  logger.info(`This app generator is built on top of Create React App (${chalk.blue('https://github.com/facebook/create-react-app')}.`)

  await installNpx()
  await initializeCreateReactApp()
}

main()
