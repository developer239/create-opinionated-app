import { shell } from 'services/shell'
import { state } from 'state'
import { generate } from 'services/generator'
import { moduleName } from 'packages/reactapp'
import { loadTemplate } from 'services/template'

export const addRedux = async () => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add redux react-redux && yarn add @types/redux @types/react-redux -D',
    '[dependencies] install redux'
  )

  await generate({
    name: `${moduleName}/state`,
    templateFiles: [
      {
        name: 'index.ts',
        data: loadTemplate([moduleName, 'templates', 'redux', 'index.ts.hbs']),
        destination: ['src', 'store', 'index.ts'],
      },
      {
        name: 'reducer.ts',
        data: loadTemplate([moduleName, 'templates', 'redux', 'reducer.ts.hbs']),
        destination: ['src', 'store', 'reducer.ts'],
      },
    ],
  })
}

export const addApollo = async () => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add apollo-boost react-apollo graphql',
    '[dependencies] install react-apollo, graphql'
  )

  await generate({
    name: `${moduleName}/state`,
    templateFiles: [
      {
        name: 'apolloClient.ts',
        data: loadTemplate([moduleName, 'templates', 'apollo', 'apolloClient.ts.hbs']),
        destination: ['src', 'apolloClient.ts'],
      },
    ],
  })
}
