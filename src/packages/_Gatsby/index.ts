import { addDependencies, removeDependencies, removeFiles } from 'services/exec'
import { generate } from 'services/generator'
import { json } from 'services/json'
import { shell } from 'services/shell'

export const moduleName = '_Gatsby'

interface IContext {
  projectFolder: string
  projectName: string
}

export const initGatsby = async (context: IContext) => {
  await shell.execWithSpinner(
    `npx gatsby new ${context.projectFolder}`,
    '[gatsby] initialize',
  )
  await removeFiles('old project structure', ['src/*'], true)
  await removeDependencies('unnecessary dependencies', ['gatsby-plugin-react-helmet', 'gatsby-plugin-offline', 'gatsby-plugin-manifest', 'gatsby-plugin-sharp', 'gatsby-transformer-sharp', 'prop-types', 'react-helmet', 'gatsby-image', 'gatsby-source-filesystem', 'prettier'])
  await addDependencies('essential plugins', ['gatsby-plugin-root-import', 'gatsby-plugin-typescript'], true)
  await addDependencies('styled-components', ['styled-components', 'gatsby-plugin-styled-components'])
  await addDependencies('@types and testing libraries', ['@types/styled-components', 'jest-styled-components'], true)
  await addDependencies('testing libraries', ['jest', 'babel-jest', 'babel-preset-gatsby', 'identity-obj-proxy', '@testing-library/jest-dom', '@testing-library/react', '@testing-library/user-event'], true)
  await removeFiles('default unnecessary config files', ['.prettierrc', 'gatsby-browser.js', 'gatsby-node.js', 'gatsby-ssr.js'])

  await json.update('package.json')(
    {
      projectName: context.projectFolder,
      message: '[json] adding baseUrl to tsconfig.json',
      messageSuccess: '[json] add baseUrl to tsconfig.json',
    },
    jsonFile => {
      delete jsonFile.description
      delete jsonFile.author
      delete jsonFile.keywords
      delete jsonFile.repository
      delete jsonFile.bugs

      return {
        ...jsonFile,
        name: context.projectFolder,
        private: false,
        compilerOptions: {
          ...jsonFile.compilerOptions,
          baseUrl: 'src',
        },
        scripts: {
          ...jsonFile.scripts,
          test: 'jest',
        },
      }
    },
  )
  await generate({
    name: moduleName,
    source: 'templates/base',
    destination: '.',
    context,
  })
}
