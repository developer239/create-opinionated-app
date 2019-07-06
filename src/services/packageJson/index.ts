import path from 'path'
import fs from 'fs'
import ora from 'ora'

interface IOptions {
  projectName: string
  message: string
  messageSuccess: string
}

type packageJsonType = any

// const sleep = (ms: number) => new Promise(resolve => {
//   setTimeout(resolve, ms)
// })

const update = async (
  { projectName, message, messageSuccess }: IOptions,
  updateFile: (packageJson: packageJsonType) => Promise<packageJsonType>
) => {
  const spinner = ora()
  spinner.start(message)

  const packageJsonPath = path.join(process.cwd(), projectName, '/package.json')

  delete require.cache[packageJsonPath]
  const jsonFile = require(packageJsonPath)

  const updatedJsonFile = await updateFile(jsonFile)

  fs.writeFileSync(packageJsonPath, JSON.stringify(updatedJsonFile, null, 2))
  spinner.succeed(messageSuccess)
}

export const packageJson = {
  update,
}
