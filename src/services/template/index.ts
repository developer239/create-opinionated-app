import fs from 'fs'
import path from 'path'
import * as R from 'ramda'
import ensureDirectory from 'ensure-directory'
import { state } from 'state'

export const loadTemplate = (sourcePath: string[]) =>
  fs.readFileSync(path.join(__dirname, 'generators', ...sourcePath), 'utf8')

export const saveTemplate = async (destinationPath: string[], data: any) => {
  const projectFolder = `${process.cwd()}/${state.projectFolder}`
  const fileFolder = R.join('/', R.init(destinationPath))
  const targetFolder = `${projectFolder}/${fileFolder}`

  await ensureDirectory(targetFolder)
  fs.writeFileSync(path.join(projectFolder, path.join(...destinationPath)), data)
}
