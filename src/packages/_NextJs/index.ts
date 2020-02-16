import { addDependencies, makeDir } from 'services/exec'
import { generate } from 'services/generator'

export const moduleName = '_NextJs'

interface IContext {
  projectFolder: string
  projectName: string
  isCypress: boolean
  isHeroku: boolean
}

export const initNextJsApp = async (context: IContext) => {
  await makeDir(context.projectFolder)

  await generate(({
    name: moduleName,
    source: 'templates',
    destination: '.',
    context,
  }))

  await addDependencies('next, react, styled-components', ['next', 'react', 'react-dom', 'styled-components'])
  await addDependencies('@types', ['@types/node ', '@types/react', '@types/react-dom', '@types/styled-components', 'babel-plugin-styled-components', 'typescript'], true)
  await addDependencies('test utilities', ['jest', '@types/jest', '@testing-library/react', 'ts-jest', 'babel-jest', 'jest-styled-components'], true)
}
