import childProcess from 'child_process'
import ora from 'ora'
import chalk from 'chalk'
import shelljs from 'shelljs'

// https://stackoverflow.com/questions/46354368/how-to-have-cli-spinner-run-during-shelljs-command-exec
const runLongExec = (command: string) => {
  return new Promise((resolve, reject) => {
    const spawnedProcess = childProcess.spawn(command, { shell: true })

    spawnedProcess.on('exit', resolve)
    spawnedProcess.on('error', reject)
  })
}

const execWithSpinner = async (
  command: string,
  successMessage: string,
  options?: { trim: string }
) => {
  const spinner = ora()
  spinner.start(
    `Running: ${chalk.yellow(
      options?.trim ? command.replace(options.trim, '') : command
    )}`
  )

  const response = await runLongExec(command)
  spinner.succeed(successMessage)

  return response
}

const exec = (command: string, silent = true) => {
  return shelljs.exec(command, { silent })
}

const execInProject = (projectName: string) => (command: string) => {
  return exec(`cd ${projectName} && ${command}`)
}

const execInProjectWithSpinner = (projectName: string) => (
  command: string,
  successMessage: string
) => {
  const goToProjectDir = `cd ${projectName} && `
  return execWithSpinner(`${goToProjectDir}${command}`, successMessage, {
    trim: goToProjectDir,
  })
}

export const shell = {
  exec,
  execWithSpinner,
  execInProject,
  execInProjectWithSpinner,
}
