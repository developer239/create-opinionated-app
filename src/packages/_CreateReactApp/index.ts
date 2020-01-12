import { prompt } from 'inquirer'
import { shell } from 'services/shell'
import { json } from 'services/json'
import { addDependencies, moveToDevDependencies, removeFiles } from 'services/exec'
import { generate } from 'services/generator'

export const moduleName = '_CreateReactApp'

interface IContext {
  projectFolder: string
  projectName: string
}

export const initReactApp = async (context: IContext) => {
  const { isRouter } = await prompt({
    name: 'isRouter',
    type: 'list',
    message: 'Do you want to use react-router?',
    choices: [
      { name: 'No', value: false },
      { name: 'Yes', value: true },
    ],
  })

  await shell.execWithSpinner(
    `npx create-react-app ${context.projectFolder} --template typescript`,
    '[create react app] initialize',
  )
  await removeFiles('old project structure', ['src/*'], true)

  await moveToDevDependencies('@types to devDependencies', ['@types/jest', '@types/node', '@types/react', '@types/react-dom'])
  await addDependencies('install @types/webpack-env', ['@types/webpack-env'], true)
  await addDependencies('styled-components', ['styled-components'])
  await addDependencies('css reset', ['sanitize.css'])
  await addDependencies('@types and testing libraries', ['@types/styled-components', 'jest-styled-components'], true)
  await moveToDevDependencies('testing libraries', ['@testing-library/jest-dom', '@testing-library/react', '@testing-library/user-event'])

  if (isRouter) {
    await addDependencies('react-router', ['react-router', 'react-router-dom'])
    await addDependencies('router @types', ['@types/react-router-dom'])
  }

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
    source: 'templates/base',
    destination: '.',
    context: {
      projectName: context.projectName,
    },
  })

  if (isRouter) {
    await generate({
      name: moduleName,
      source: 'templates/react-router',
      destination: '.',
      context: {
        projectName: context.projectName,
      },
    })
  }
}
