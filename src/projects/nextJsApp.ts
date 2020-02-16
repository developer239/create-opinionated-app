import { prompt } from 'inquirer'
import { initNextJsApp } from 'packages/_NextJs'
import { addBrowserlist } from 'packages/browserslist'
import { addCypress } from 'packages/cypress'
import { addEditorconfig } from 'packages/editorconfig'
import { addEslint } from 'packages/eslint'
import { addFilesToGit } from 'packages/git/add'
import { setUpGitHooks } from 'packages/git/hooks'
import { addHerokuWeb } from 'packages/heroku'
import { addPrettier } from 'packages/prettier'
import { addStylelint } from 'packages/stylelint'
import { DeploymentType, IMainState, ProjectType } from 'state.types'

export const createNextJsApp = async (context: IMainState) => {
  const { isCypress } = await prompt({
    name: 'isCypress',
    type: 'list',
    message: 'Do you want to use cypress?',
    choices: [
      { name: 'No', value: false },
      { name: 'Yes', value: true },
    ],
  })

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

  // Init app
  await initNextJsApp({
    projectName: context.projectName,
    projectFolder: context.projectFolder,
    isCypress,
    isHeroku,
  })

  if (isCypress) {
    await addCypress({ projectFolder: context.projectFolder, projectName: context.projectName })
  }

  // Code quality tools
  await addEditorconfig()
  await addBrowserlist()
  await addPrettier({ projectFolder: context.projectFolder })
  await addStylelint({
    appType: context.appType,
    projectFolder: context.projectFolder,
  })
  await addEslint({ appType: context.appType, projectFolder: context.projectFolder })

  // Git hooks
  await setUpGitHooks()

  if (isHeroku) {
    await addHerokuWeb({
      projectName: context.projectName,
      projectFolder: context.projectFolder,
      projectType: ProjectType.NEXT,
    })
  }

  // Commit and share on GitHub
  await addFilesToGit({ projectFolder: context.projectFolder })
}
