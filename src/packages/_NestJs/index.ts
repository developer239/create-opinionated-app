import { shell } from 'services/shell'
import { removeFiles } from 'services/exec'
import { generate } from 'services/generator'
import { json } from 'services/json'

export const moduleName = '_NestJs'

interface IContext {
  projectFolder: string
  projectName: string
  isHeroku: boolean
}

export const initNestJsApp = async (context: IContext) => {
  await shell.execWithSpinner(
    `npx nest new ${context.projectFolder} --package-manager yarn`,
    '[nest.js] initialize',
  )
  await removeFiles('old project structure', ['src', 'test', '.eslintrc.js', '.prettierrc', 'README.md'], true)
  await json.update('package.json')(
    {
      projectName: context.projectFolder,
      message: '[json] cleaning package.json',
      messageSuccess: '[json] clean package.json',
    },
    jsonFile => {
      delete jsonFile.jest
      delete jsonFile.scripts.lint
      delete jsonFile.scripts['test:e2e']

      return jsonFile
    },
  )

  await generate({
    name: moduleName,
    source: 'templates/base',
    destination: '.',
    context,
  })
}
