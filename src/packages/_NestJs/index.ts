import { addDependencies, removeFiles } from 'services/exec'
import { generate } from 'services/generator'
import { json } from 'services/json'
import { shell } from 'services/shell'

export const moduleName = '_NestJs'

interface IContext {
  projectFolder: string
  projectName: string
  isHeroku: boolean
  isDatabase: boolean
}

export const initNestJsApp = async (context: IContext) => {
  await shell.execWithSpinner(
    `npx nest new ${context.projectFolder} --package-manager yarn`,
    '[nest.js] initialize',
  )
  await addDependencies('install @nestjs/config', ['@nestjs/config'])
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

      jsonFile.scripts['start:dev'] = 'NODE_ENV=development nest start --watch'

      return jsonFile
    },
  )

  await generate({
    name: moduleName,
    source: 'templates/base',
    destination: '.',
    context,
  })

  if (context.isDatabase) {
    await addDependencies('install typeorm', ['pg', 'typeorm', '@nestjs/typeorm', 'pg-connection-string'])
    await addDependencies('install typeorm @types', ['@types/pg-connection-string'], true)

    await generate({
      name: moduleName,
      source: 'templates/typeorm',
      destination: '.',
      context,
    })
  }
}
