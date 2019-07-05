import childProcess from 'child_process'
import ora from 'ora'
import chalk from 'chalk'
import shelljs from 'shelljs'

// https://stackoverflow.com/questions/46354368/how-to-have-cli-spinner-run-during-shelljs-command-exec
const runLongExec = (command: string) => {
  return new Promise((resolve, reject) => {
    const process = childProcess.spawn(command, { shell: true })

    process.on('exit', resolve)
    process.on('error', reject)
  })
}

const execWithSpinner = async (command: string, successMessage: string) => {
  const spinner = ora()
  spinner.start(`Running: ${chalk.yellow(command)}`)
  const response = await runLongExec(command)
  spinner.succeed(successMessage)

  return response
}

const exec = (command: string, silent: boolean = true) => {
  return shelljs.exec(command, { silent })
}

export const shell = {
  exec,
  execWithSpinner,
}
