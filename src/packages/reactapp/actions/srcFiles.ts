import { shell } from 'services/shell'
import { state } from 'state'
import { generate } from 'services/generator'
import { moduleName } from 'packages/reactapp'
import { loadTemplate } from 'services/template'

interface IContext {
  isApollo: boolean
  isRouter: boolean
  isRedux: boolean
}

export const replaceSourceFiles = async (context: IContext) => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'rm -r src/*',
    '[fs] remove old project structure'
  )
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add styled-components && yarn add @types/styled-components jest-styled-components @testing-library/react -D',
    '[dependencies] install styled-components, jest, @testing-library/react'
  )

  await generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'env',
        data: loadTemplate([moduleName, 'templates', 'srcFiles', 'env.hbs']),
        destination: ['.env'],
      },
      {
        name: 'setupTests.ts',
        data: loadTemplate([moduleName, 'templates', 'srcFiles', 'src', 'setupTests.ts.hbs']),
        destination: ['src', 'setupTests.ts'],
      },
      {
        name: 'react-app-env.d.ts',
        data: loadTemplate([moduleName, 'templates', 'srcFiles', 'src', 'react-app-env.d.ts.hbs']),
        destination: ['src', 'react-app-env.d.ts'],
      },
      {
        name: 'index.tsx',
        data: loadTemplate([moduleName, 'templates', 'srcFiles', 'src', 'index.tsx.hbs']),
        destination: ['src', 'index.tsx'],
        context: {
          ...context,
          projectName: state.projectName,
        },
      },
      {
        name: 'App.tsx',
        data: loadTemplate([moduleName, 'templates', 'srcFiles', 'src', 'App.tsx.hbs']),
        destination: ['src', 'App.tsx'],
        context: {
          ...context,
          projectName: state.projectName,
        },
      },
      {
        name: 'components/Layout',
        data: loadTemplate([moduleName, 'templates', 'srcFiles', 'src', 'components', 'Layout', 'index.ts.hbs']),
        destination: ['src', 'components', 'Layout', 'index.ts'],
      },
    ],
  })
}
