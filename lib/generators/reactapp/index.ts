import { shell } from 'services/shell'
import { state } from 'state'
import { json } from 'services/json'

export const moduleName = 'reactapp'

export const initReactApp = async () => {
  await shell.execWithSpinner(
    `npx create-react-app ${state.projectFolder} --typescript`,
    '[create react app] initialize'
  )

  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn remove @types/jest @types/node @types/react @types/react-dom && yarn add @types/jest @types/node @types/react @types/react-dom -D',
    '[dependencies] move @types to devDependencies'
  )

  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add @types/webpack-env -D',
    '[dependencies] install @types/webpack-env'
  )

  await json.update('tsconfig.json')(
    {
      projectName: state.projectFolder,
      message: '[json] adding baseUrl to tsconfig.json',
      messageSuccess: '[json] add baseUrl to tsconfig.json',
    },
    jsonFile => {
      jsonFile.compilerOptions.baseUrl = 'src'

      return jsonFile
    }
  )
}
