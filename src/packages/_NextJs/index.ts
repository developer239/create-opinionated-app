import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'
import { addDependencies, makeDir } from 'services/exec'

export const moduleName = '_NextJs'

interface IContext {
  projectFolder: string
  projectName: string
}

export const initNextJsApp = async (context: IContext) => {
  await makeDir(context.projectFolder)

  await generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'package.json',
        data: loadTemplate([moduleName, 'templates', 'package.json.hbs']),
        destination: ['package.json'],
        context: {
          projectFolder: context.projectFolder,
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
          projectName: context.projectName,
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
          projectName: context.projectName,
        },
      },
    ],
  })

  await addDependencies('react, styled-components', ['react', 'react-dom', 'styled-components'])
  await addDependencies('@types', ['@types/node ', '@types/react', '@types/react-dom', '@types/styled-components', 'babel-plugin-styled-components', 'typescript'], true)
}
