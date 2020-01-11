import path from 'path'
import { generate } from 'services/generator'
import { AppType } from 'state.types'
import { addDependencies } from 'services/exec'
import { json } from 'services/json'

const moduleName = 'eslint'

interface IContext {
  appType: AppType
  projectFolder: string
}

export const addEslint = async (context: IContext) => {
  const lintTs = 'eslint --ext .ts,.tsx src'

  const dependenciesShared = ['eslint', 'eslint-plugin-import', '@code-quality/eslint-config-typescript', 'eslint-config-prettier']
  const dependenciesMobile = ['@code-quality/eslint-config-react-native']
  const dependenciesWeb = ['@code-quality/eslint-config-react']
  const dependencies = [...dependenciesShared, ...(context.appType === AppType.MOBILE ? dependenciesMobile : dependenciesWeb)]

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

  await addDependencies('eslint', dependencies, true)

  return generate({
    name: moduleName,
    source: path.join('templates', context.appType),
    destination: '.',
  })
}
