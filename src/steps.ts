import chalk from 'chalk'
import { prompt } from 'inquirer'
import { shell } from 'src/services/shell'
import { logger } from 'src/services/log'

export const installNpx = async () => {
  const { code } = shell.exec('npx --version')

  if (code !== 0) {
    logger.info(`Npx not found. Installing npx on your machine ${chalk.blue('https://github.com/zkat/npx#readme')}`)
    await shell.execWithSpinner('npm install -g npx', 'Npx installed')
  }
}

export const initializeCreateReactApp = async () => {
  const { projectName } = await prompt({
    name: 'projectName',
    message: 'How do you want to call your project?',
  })

  await shell.execWithSpinner(`npx create-react-app ${projectName}`, 'Create React App initialized')
}
