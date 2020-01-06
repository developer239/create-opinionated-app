import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'

const moduleName = 'editorconfig'

export const addEditorconfig = () =>
  generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'editorconfig',
        data: loadTemplate([moduleName, 'templates', 'editorconfig.hbs']),
        destination: ['.editorconfig'],
      },
    ],
  })
