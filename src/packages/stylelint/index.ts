import { AppType } from 'state.types'
import { state } from 'state'
import { json } from 'services/json'
import { generate } from 'services/generator'
import { loadTemplate } from 'services/template'
import { addDependencies } from 'services/exec'

const moduleName = 'stylelint'

interface IContext {
  appType: AppType
}

export const addStylelint = async (context: IContext) => {
  const lintCssMobile = 'stylelint \'pages/**/*.{ts,tsx}\''
  const lintCssWeb = 'stylelint \'**/*.{ts,tsx}\''
  const lintCss = context.appType === AppType.MOBILE ? lintCssMobile : lintCssWeb

  const dependenciesShared = ['stylelint', 'prettier', 'stylelint-config-prettier']
  const dependenciesMobile = ['@code-quality/stylelint-styled-components-react-native-config']
  const dependenciesWeb = ['@code-quality/stylelint-styled-components-config']
  const dependencies = [...dependenciesShared, ...(context.appType === AppType.MOBILE ? dependenciesMobile : dependenciesWeb)]

  await json.update('package.json')(
    {
      projectName: state.projectFolder,
      message: '[json] adding lint:css to scripts',
      messageSuccess: '[json] add "lint:css" to scripts',
    },
    jsonFile => ({
      ...jsonFile,
      scripts: {
        ...jsonFile.scripts,
        'lint:css': lintCss,
      },
    }),
  )

  await addDependencies('stylelint', dependencies)

  return generate({
    name: 'stylelintrc.js',
    templateFiles: [
      {
        name: 'stylelintrc.js',
        data: loadTemplate([moduleName, 'templates', context.appType, 'stylelintrc.js.hbs']),
        destination: ['.stylelintrc.js'],
      },
    ],
  })
}
