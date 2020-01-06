import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'

const moduleName = 'browserslist'

export const addBrowserlist = () =>
  generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'browserslistrc',
        data: loadTemplate([moduleName, 'templates', 'browserslistrc.hbs']),
        destination: ['.browserslistrc'],
      },
    ],
  })
