import { json } from 'services/json'
import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'
import { addDependencies } from 'services/exec'

const moduleName = 'prettier'

interface IContext {
  projectFolder: string
}

export const addPrettier = async (context: IContext) => {
  await json.update('package.json')(
    {
      projectName: context.projectFolder,
      message: '[json] adding "format" to scripts',
      messageSuccess: '[json] add "format" to scripts',
    },
    jsonFile => ({
      ...jsonFile,
      scripts: {
        ...jsonFile.scripts,
        format: 'prettier --write \'*/**/*.{ts,tsx,css,md,json}\'',
      },
    }),
  )

  await addDependencies('prettier', ['prettier', '@code-quality/prettier-config'], true)
  await generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'prettierrc.js',
        data: loadTemplate([moduleName, 'templates', 'prettierrc.js.hbs']),
        destination: ['.prettierrc.js'],
      },
    ],
  })
}
