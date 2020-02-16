import path from 'path'
import ora from 'ora'
import { copyFiles } from 'services/template'

interface IOptions {
  name: string
  source: string
  destination: string
  context?: Object
}

export const generate = async ({
  name,
  source,
  destination,
  context,
}: IOptions) => {
  const spinner = ora()
  spinner.start(`[generator] running ${name}`)

  try {
    await copyFiles(path.join(name, source), destination, context)
    spinner.succeed(`[generator] create ${name}`)
  } catch (error) {
    spinner.warn(`[generator] ${name} error: ${error}`)
  }
}
