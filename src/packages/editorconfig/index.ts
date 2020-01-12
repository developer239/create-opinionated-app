import { generate } from 'services/generator'

const moduleName = 'editorconfig'

export const addEditorconfig = () =>
  generate({
    name: moduleName,
    source: 'templates',
    destination: '.',
  })
