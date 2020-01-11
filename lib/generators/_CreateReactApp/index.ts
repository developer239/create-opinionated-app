import { shell } from 'services/shell'
import { json } from 'services/json'
import { addDependencies, moveToDevDependencies, removeFiles } from 'services/exec'
import { generate } from 'services/generator'

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
    },
  )

  await generate({
    name: moduleName,
    source: 'templates',
    destination: '.',
    context: {
      projectName: context.projectName,
    },
  })
}
