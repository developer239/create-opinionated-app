import { logger } from 'services/log'
import { shell } from 'services/shell'

interface IContext {
  projectFolder: string
}

export const addFilesToGit = async (context: IContext) => {
  const { code } = shell.exec('git --version')

  if (code !== 0) {
    return logger.warning('git not found. skipping this step')
  }

  await shell.execInProjectWithSpinner(context.projectFolder)(
    'git add .',
    '[git] add new files',
  )

  await shell.execInProjectWithSpinner(context.projectFolder)(
    'git commit -m "feat: bootstrap application"',
    '[git] commit changes',
  )
}
