import { shell } from 'services/shell'
import { json } from 'services/json'
import { addDependencies, moveToDevDependencies, removeFiles } from 'services/exec'
import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'

export const moduleName = '_CreateReactApp'

interface IContext {
  projectFolder: string
  projectName: string
}

// eslint-disable-next-line
export const initReactApp = async (context: IContext) => {
  await shell.execWithSpinner(
    `npx create-react-app ${context.projectFolder} --typescript`,
    '[create react app] initialize',
  )
  await removeFiles('old project structure', ['src/*'], true)

  await moveToDevDependencies('@types to devDependencies', ['@types/jest', '@types/node', '@types/react', '@types/react-dom'])
  await addDependencies('install @types/webpack-env', ['@types/webpack-env'], true)
  await addDependencies('styled-components', ['styled-components'])
  await addDependencies('types and testing libraries', ['@types/styled-components', 'jest-styled-components', '@testing-library/react'], true)

  await json.update('tsconfig.json')(
    {
      projectName: context.projectFolder,
      message: '[json] adding baseUrl to tsconfig.json',
      messageSuccess: '[json] add baseUrl to tsconfig.json',
    },
    jsonFile => ({
      ...jsonFile,
      compilerOptions: {
        ...jsonFile.compilerOptions,
        baseUrl: 'src',
      },
    }),
  )

  await json.update('package.json')(
    {
      projectName: context.projectFolder,
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

  await generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'README.md',
        data: loadTemplate([moduleName, 'templates', 'README.md.hbs']),
        destination: ['README.md'],
        context: {
          projectFolder: context.projectFolder,
          projectName: context.projectName,
        },
      },
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
          projectName: context.projectName,
        },
      },
      {
        name: 'App.tsx',
        data: loadTemplate([moduleName, 'templates', 'srcFiles', 'src', 'App.tsx.hbs']),
        destination: ['src', 'App.tsx'],
        context: {
          projectName: context.projectName,
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
