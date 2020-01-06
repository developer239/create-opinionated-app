import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'
import { logger } from 'services/log'
import { ProjectType } from 'state.types'
import { state } from 'state'

const moduleName = 'heroku'

export const addHeroku = () => {
  if (state.projectType === ProjectType.RN || state.projectType === ProjectType.NEXT) {
    return logger.warning('[generator] skipped (heroku not supported)')
  }

  return generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'Procfile',
        data: loadTemplate([moduleName, 'templates', 'create-react-app', 'Procfile.hbs']),
        destination: ['Procfile'],
      },
    ],
  })
}
