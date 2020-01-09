import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'
import { AppType, ProjectType } from 'state.types'
import { addDependencies } from 'services/exec'
import { json } from 'services/json'

const moduleName = 'eslint'

interface IContext {
  projectType: ProjectType
  appType: AppType
  projectFolder: string
}

export const addEslint = async (context: IContext) => {
  const lintTsNEXT = 'eslint --ext .ts,.tsx pages'
  const lintTsOther = 'eslint --ext .ts,.tsx src'
  const lintTs = context.projectType === ProjectType.NEXT ? lintTsNEXT : lintTsOther

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

  await addDependencies('eslint', dependencies)

  return generate({
    name: moduleName,
    templateFiles: [
      {
        name: 'eslintrc.js',
        data: loadTemplate([moduleName, 'templates', context.appType, 'eslintrc.js.hbs']),
        destination: ['.eslintrc.js'],
      },
    ],
  })
}
