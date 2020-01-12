import * as chalk from 'chalk'
import { shell } from 'services/shell'
import { logger } from 'services/log'

export const checkYarn = async () => {
  const { code } = shell.exec('yarn --version')

  if (code !== 0) {
    logger.info(
      `Yarn not found. Installing yarn on your machine ${chalk.blue(
        'https://github.com/yarnpkg/yarn'
      )}`
    )
    await shell.execWithSpinner('npm install -g yarn', 'yarn installed')
  }
}
