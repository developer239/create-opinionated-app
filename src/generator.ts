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
  spinner.start(`Creating ${generatorName}`)
  const { failures } = await nodePlopGenerator
    .getGenerator(generatorName)
    .runActions(generatorState)

  if (failures.length) {
    logger.warning(
      `Failures creating ${generatorName}: ${JSON.stringify(failures)}`
    )
  }

  spinner.succeed(`${generatorName} created`)
}

export const generator = {
  runActions,
}
