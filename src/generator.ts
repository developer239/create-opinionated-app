import path from 'path'
import nodePlop from 'node-plop'
import ora from 'ora'
import { IGeneratorState } from 'src/index.types'

const nodePlopGenerator = nodePlop(path.join(__dirname, 'plopfile.js'))

const runActions = async (
  generatorState: IGeneratorState,
  generatorName: string
) => {
  const spinner = ora()
  spinner.start(`Creating ${generatorName}`)
  await nodePlopGenerator.getGenerator(generatorName).runActions(generatorState)
  spinner.succeed(`${generatorName} created`)
}

export const generator = {
  runActions,
}
