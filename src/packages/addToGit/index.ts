import { shell } from 'services/shell'
import { state } from 'state'
import { logger } from 'services/log'

export const addFilesToGit = async () => {
  const { code } = shell.exec('git --version')

  if (code !== 0) {
    return logger.warning('git not found. skipping this step')
  }

  await shell.execInProjectWithSpinner(state.projectFolder)(
    'git add .',
    '[git] add new files'
  )

  await shell.execInProjectWithSpinner(state.projectFolder)(
    'git commit -m "feat: bootstrap application"',
    '[git] commit changes'
  )
}
