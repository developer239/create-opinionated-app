import { generate } from 'services/generator'

const moduleName = 'browserslist'

export const addBrowserlist = () =>
  generate({
    name: moduleName,
    source: 'templates',
    destination: '.',
  })
