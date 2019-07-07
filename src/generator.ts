import path from 'path'
import nodePlop from 'node-plop'
import ora from 'ora'
import { IGeneratorState } from 'src/index.types'
import { logger } from 'src/services/log'

const nodePlopGenerator = nodePlop(path.join(__dirname, 'plopfile.js'))

const runActions = async (
  generatorState: IGeneratorState,
  generatorName: string
) => {
  const spinner = ora()
  spinner.start(`[generator] running ${generatorName}`)
  const { failures } = await nodePlopGenerator
    .getGenerator(generatorName)
    .runActions(generatorState)

  if (failures.length) {
    logger.warning(
      `Failures creating ${generatorName}: ${JSON.stringify(failures)}`
    )
  }

  spinner.succeed(`[generator] create ${generatorName}`)
}

export const generator = {
  runActions,
}
