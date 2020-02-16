import { prompt } from 'inquirer'
import { addDependencies } from 'services/exec'
import { generate } from 'services/generator'
import { json } from 'services/json'

const moduleName = 'cypress'

interface IContext {
  projectFolder: string
  projectName: string
}

enum CiType {
  NONE = 'none',
  GITHUB = 'github',
}

export const addCypress = async (context: IContext) => {
  const { ciType } = await prompt({
    name: 'ciType',
    type: 'list',
    message: 'Do you want to generate CI configuration for cypress?',
    choices: [
      { name: 'None', value: CiType.NONE },
      { name: 'GitHub Actions', value: CiType.GITHUB },
    ],
  })

  await json.update('package.json')(
    {
      projectName: context.projectFolder,
      message: '[json] adding "cypress:open" & "cypress:run" to scripts',
      messageSuccess: '[json] add "cypress:open" & "cypress:run" to scripts',
    },
    jsonFile => ({
      ...jsonFile,
      scripts: {
        ...jsonFile.scripts,
        'cypress:open': 'node_modules/.bin/cypress open',
        'cypress:run': 'node_modules/.bin/cypress run',
      },
    }),
  )

  await addDependencies('cypress', ['cypress'], true)

  await generate({
    name: moduleName,
    source: 'templates/base',
    destination: '.',
    context,
  })

  if (ciType === CiType.GITHUB) {
    await generate({
      name: moduleName,
      source: 'templates/ci/github',
      destination: '.',
    })
  }
}
