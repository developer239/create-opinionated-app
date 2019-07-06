import chalk from 'chalk'

const logInfo = console.log

export const logger = {
  info: logInfo,
  warning: (message: string) => console.log(chalk.red(message)),
}
