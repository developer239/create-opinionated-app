import { moduleName } from '../index'
import { shell } from 'services/shell'
import { state } from 'state'
import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'

interface IContext {
  isDocker: boolean
  isHeroku: boolean
}

export const addReadme = async (context: IContext) => {
  shell.execInProject(state.projectFolder)('rm README.md')
  await generate({
    name: `${moduleName}/readme`,
    templateFiles: [
      {
        name: 'README.md',
        data: loadTemplate([moduleName, 'templates', 'README.md.hbs']),
        destination: ['README.md'],
        context: {
          projectFolder: state.projectFolder,
          projectName: state.projectName,
          isDocker: context.isDocker,
          isHeroku: context.isHeroku,
        },
      },
    ],
  })
}
