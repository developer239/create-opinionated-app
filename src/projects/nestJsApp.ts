import { prompt } from 'inquirer'
import { initNestJsApp } from 'packages/_NestJs'
import { addEditorconfig } from 'packages/editorconfig'
import { addEslint } from 'packages/eslint'
import { setUpGitHooks } from 'packages/git/hooks'
import { addHerokuNode } from 'packages/heroku'
import { addPrettier } from 'packages/prettier'
import { AppType, DatabaseType, DeploymentType, IMainState, ProjectType } from 'state.types'

export const createNestJsApp = async (context: IMainState) => {
  const { databaseType } = await prompt({
    name: 'databaseType',
    type: 'list',
    message: 'Do you want to use database?',
    choices: [
      { name: 'No', value: DatabaseType.NONE },
      { name: 'SQL', value: DatabaseType.SQL },
    ],
  })
  const isDatabase = databaseType === DatabaseType.SQL

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
    isDatabase,
  })

  await addEditorconfig()
  await addPrettier({ projectFolder: context.projectFolder })
  await addEslint({ appType: context.appType, projectFolder: context.projectFolder })
  await setUpGitHooks({
    appType: AppType.NODE,
  })

  if (isHeroku) {
    await addHerokuNode({
      projectName: context.projectName,
      projectFolder: context.projectFolder,
      projectType: ProjectType.NEST,
      isDatabase,
    })
  }
}
