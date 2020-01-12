import path from 'path'
import fs from 'fs'
import ora from 'ora'

interface IOptions {
  projectName: string
  message: string
  messageSuccess: string
}

type jsonFileType = any

const update = (fileName: string) => async (
  { projectName, message, messageSuccess }: IOptions,
  updateFile: (packageJson: jsonFileType) => Promise<jsonFileType>
) => {
  const spinner = ora()
  spinner.start(message)

  const jsonFilePath = path.join(process.cwd(), projectName, fileName)

  // These two lines break about 10 different eslint rules 🙈
  // eslint-disable-next-line
  delete require.cache[jsonFilePath]
  // eslint-disable-next-line
  const jsonFile = require(jsonFilePath)

  const updatedJsonFile = await updateFile(jsonFile)

  fs.writeFileSync(jsonFilePath, JSON.stringify(updatedJsonFile, null, 2))
  spinner.succeed(messageSuccess)
}

export const json = {
  update,
}
