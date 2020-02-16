import { prompt } from 'inquirer'
import { DeploymentType, IMainState, ProjectType } from 'state.types'
import { initNestJsApp } from '../packages/_NestJs'
import { addEditorconfig } from '../packages/editorconfig'
import { addPrettier } from '../packages/prettier'
import { addEslint } from '../packages/eslint'
import { setUpGitHooks } from '../packages/git/hooks'
import { addHerokuNode } from '../packages/heroku'

export const createNestJsApp = async (context: IMainState) => {
  const { deploymentType } = await prompt({
    name: 'deploymentType',
    type: 'list',
    message: 'Do you want to generate CD configuration?',
    choices: [
      { name: 'No', value: DeploymentType.NONE },
      { name: 'Heroku', value: DeploymentType.HEROKU },
    ],
  })
  const isHeroku = deploymentType === DeploymentType.HEROKU

  await initNestJsApp({
    projectFolder: context.projectFolder,
    projectName: context.projectName,
    isHeroku,
  })

  await addEditorconfig()
  await addPrettier({ projectFolder: context.projectFolder })
  await addEslint({ appType: context.appType, projectFolder: context.projectFolder })
  await setUpGitHooks()

  if (isHeroku) {
    await addHerokuNode({
      projectName: context.projectName,
      projectFolder: context.projectFolder,
      projectType: ProjectType.NEST,
    })
  }
}
