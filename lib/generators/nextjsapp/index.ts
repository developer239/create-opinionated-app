import { shell } from 'services/shell'
import { state } from 'state'
import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'

export const moduleName = 'nextjsapp'

export const initNextJsApp = async () => {
  await shell.execWithSpinner(
    `mkdir ${state.projectFolder}`,
    '[nextjs app] create project folder'
  )

  await generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'package.json',
        data: loadTemplate([moduleName, 'templates', 'package.json.hbs']),
        destination: ['package.json'],
        context: {
          projectFolder: state.projectFolder,
        },
      },
      {
        name: 'babelrc',
        data: loadTemplate([moduleName, 'templates', 'babelrc.hbs']),
        destination: ['.babelrc'],
      },
      {
        name: 'gitignore',
        data: loadTemplate([moduleName, 'templates', 'gitignore.hbs']),
        destination: ['.gitignore'],
      },
      {
        name: 'README.md',
        data: loadTemplate([moduleName, 'templates', 'README.md.hbs']),
        destination: ['README.md'],
        context: {
          projectName: state.projectName,
        },
      },
      {
        name: 'next-env.d.ts',
        data: loadTemplate([moduleName, 'templates', 'next-env.d.ts.hbs']),
        destination: ['next-env.d.ts'],
      },
      {
        name: 'tsconfig.json',
        data: loadTemplate([moduleName, 'templates', 'tsconfig.json.hbs']),
        destination: ['tsconfig.json'],
      },
      {
        name: '_document.tsx',
        data: loadTemplate([moduleName, 'templates', 'pages', '_document.tsx.hbs']),
        destination: ['pages', '_document.tsx'],
      },
      {
        name: 'index.tsx',
        data: loadTemplate([moduleName, 'templates', 'pages', 'index.tsx.hbs']),
        destination: ['pages', 'index.tsx'],
        context: {
          projectName: state.projectName,
        },
      },
    ],
  })

  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add next react react-dom styled-components',
    '[dependencies] install initial dependencies'
  )
  await shell.execInProjectWithSpinner(state.projectFolder)(
    'yarn add @types/node @types/react @types/react-dom @types/styled-components babel-plugin-styled-components typescript -D',
    '[dependencies] install initial devDependencies'
  )
}
