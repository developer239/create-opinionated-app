import { json } from 'services/json'
import { state } from 'state'

export const cleanPackageJson = () =>
  json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: '[json] cleaning package.json',
      messageSuccess: '[json] clean package.json',
    },
    jsonFile => {
      delete jsonFile.private
      delete jsonFile.browserslist
      delete jsonFile.eslintConfig
      delete jsonFile.scripts.eject

      return jsonFile
    }
  )
