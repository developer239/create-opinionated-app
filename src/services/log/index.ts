/* eslint-disable */
import chalk from 'chalk'

const logInfo = console.log

export const logger = {
  info: logInfo,
  // eslint-disable-next-line no-irregular-whitespace
  warning: (message: string) => console.log(`  ${chalk.red(message)}`),
}
