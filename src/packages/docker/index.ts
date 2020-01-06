import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'
import { logger } from 'services/log'
import { ProjectType } from 'state.types'
import { state } from 'state'

const moduleName = 'docker'

export const addDocker = () => {
  if (state.projectType !== ProjectType.CRA) {
    return logger.warning('[generator] skipped (docker not supported)')
  }

  return generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'Dockerfile',
        data: loadTemplate([moduleName, 'templates', 'create-react-app', 'Dockerfile.hbs']),
        destination: ['Dockerfile'],
      },
      {
        name: 'docker-compose.yml',
        data: loadTemplate([moduleName, 'templates', 'create-react-app', 'docker-compose.yml.hbs']),
        destination: ['docker-compose.yml'],
        context: {
          projectFolder: state.projectFolder,
        },
      },
    ],
  })
}
