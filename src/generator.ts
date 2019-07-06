import path from 'path'
import nodePlop from 'node-plop'
import ora from 'ora'

const nodePlopGenerator = nodePlop(path.join(__dirname, 'plopfile.js'))

const runActions = async (projectName: string, generatorName: string) => {
  const spinner = ora()
  spinner.start(`Creating ${generatorName}`)
  await nodePlopGenerator.getGenerator(generatorName).runActions({ projectFolder: projectName })
  spinner.succeed(`${generatorName} created`)
}

export const generator = {
  runActions,
}
