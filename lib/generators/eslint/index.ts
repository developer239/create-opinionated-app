import path from 'path'
import { addDependencies } from 'services/exec'
import { generate } from 'services/generator'
import { json } from 'services/json'
import { AppType } from 'state.types'

const moduleName = 'eslint'

interface IContext {
  appType: AppType
  projectFolder: string
}

export const addEslint = async (context: IContext) => {
  const lintTs = 'eslint --ext .ts,.tsx src'

  await json.update('package.json')(
    {
      projectName: context.projectFolder,
      message: '[json] adding "lint:ts" to scripts',
      messageSuccess: '[json] add "lint:ts" to scripts',
    },
    jsonFile => ({
      ...jsonFile,
      scripts: {
        ...jsonFile.scripts,
        'lint:ts': lintTs,
      },
    }),
  )

  const dependenciesShared = ['eslint', 'eslint-plugin-import', '@code-quality/eslint-config-typescript', '@code-quality/eslint-config-jest', 'eslint-config-prettier']
  const dependenciesMobile = ['@code-quality/eslint-config-react-native']
  const dependenciesWeb = ['@code-quality/eslint-config-react']
  const dependenciesNode = ['@code-quality/eslint-config-node']

  switch (context.appType) {
    case AppType.MOBILE: {
      const dependencies = [...dependenciesShared, ...dependenciesMobile]
      await addDependencies('eslint', dependencies, true)
      break
    }
    case AppType.WEB: {
      const dependencies = [...dependenciesShared, ...dependenciesWeb]
      await addDependencies('eslint', dependencies, true)
      break
    }
    case AppType.NODE: {
      const dependencies = [...dependenciesShared, ...dependenciesNode]
      await addDependencies('eslint', dependencies, true)
      break
    }
  }

  return generate({
    name: moduleName,
    source: path.join('templates', context.appType),
    destination: '.',
  })
}
