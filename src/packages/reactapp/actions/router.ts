import { shell } from 'services/shell'
import { state } from 'state'
import { generate } from 'services/generator'
import { moduleName } from 'packages/reactapp'
import { loadTemplate } from 'services/template'

export const addRouter = async () => {
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add react-router react-router-dom && yarn add @types/react-router-dom -D',
    '[dependencies] install react-router'
  )

  await generate({
    name: `${moduleName}/router`,
    templateFiles: [
      {
        name: 'pages/Home',
        data: loadTemplate([moduleName, 'templates', 'router', 'pages', 'Home', 'index.tsx.hbs']),
        destination: ['src', 'pages', 'Home', 'index.tsx'],
        context: { projectName: state.projectName },
      },
      {
        name: 'pages/Home/test',
        data: loadTemplate([moduleName, 'templates', 'router', 'pages', 'Home', 'test', 'Home.test.tsx.hbs']),
        destination: ['src', 'pages', 'Home', 'test', 'Home.test.tsx'],
      },
      {
        name: 'pages/NotFound',
        data: loadTemplate([moduleName, 'templates', 'router', 'pages', 'NotFound', 'index.tsx.hbs']),
        destination: ['src', 'pages', 'NotFound', 'index.tsx'],
      },
      {
        name: 'pages/NotFound/test',
        data: loadTemplate([moduleName, 'templates', 'router', 'pages', 'NotFound', 'test', 'NotFound.test.tsx.hbs']),
        destination: ['src', 'pages', 'NotFound', 'test', 'NotFound.test.tsx'],
      },
      {
        name: 'testUtils/render',
        data: loadTemplate([moduleName, 'templates', 'router', 'testUtils', 'render.tsx.hbs']),
        destination: ['src', 'testUtils', 'render.tsx'],
      },
    ],
  })
}
