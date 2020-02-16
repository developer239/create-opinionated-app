import * as chalk from 'chalk'
import { logger } from 'services/log'
import { shell } from 'services/shell'

export const checkNpx = async () => {
  const { code } = shell.exec('npx --version')

  if (code !== 0) {
    logger.info(
      `Npx not found. Installing npx on your machine ${chalk.blue(
        'https://github.com/zkat/npx'
      )}`
    )
    await shell.execWithSpinner('npm install -g npx', 'npx installed')
  }
}
