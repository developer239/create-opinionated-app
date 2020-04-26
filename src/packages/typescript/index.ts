import path from 'path'
import { addDependencies } from 'services/exec'
import { generate } from 'services/generator'
import { json } from 'services/json'
import { AppType } from 'state.types'

const moduleName = 'typescript'

interface IContext {
  appType: AppType
  projectFolder: string
}

export const addTypescript = async (context: IContext) => {
  await json.update('package.json')(
    {
      projectName: context.projectFolder,
      message: '[json] adding typescript to scripts',
      messageSuccess: '[json] add typescript to scripts',
    },
    jsonFile => ({
      ...jsonFile,
      scripts: {
        ...jsonFile.scripts,
        start: 'ts-node -r tsconfig-paths/register src/index.ts',
        build: 'tsc',
      },
    }),
  )

  await addDependencies('typescript', ['typescript', 'ts-node', 'tsconfig-paths', '@types/node'], true)

  return generate({
    name: moduleName,
    source: path.join('templates', context.appType),
    destination: '.',
  })
}
