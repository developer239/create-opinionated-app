import { prompt } from 'inquirer'
import { addBrowserlist } from 'packages/browserslist'
import { initReactApp } from 'packages/_CreateReactApp'
import { addEditorconfig } from 'packages/editorconfig'
import { setUpGitHooks } from 'packages/git/hooks'
import { addFilesToGit } from 'packages/git/add'
import { addPrettier } from 'packages/prettier'
import { addStylelint } from 'packages/stylelint'
import { addEslint } from 'packages/eslint'
import { addCypress } from 'packages/cypress'
import { IMainState } from 'state.types'

export const createReactApp = async (context: IMainState) => {
  const { isCypress } = await prompt({
    name: 'isCypress',
    type: 'list',
    message: 'Do you want to use cypress?',
    choices: [
      { name: 'No', value: false },
      { name: 'Yes', value: true },
    ],
  })

  // Init app
  await initReactApp({
    projectFolder: context.projectFolder,
    projectName: context.projectName,
    isCypress,
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

  // Commit and share on GitHub
  await addFilesToGit({ projectFolder: context.projectFolder })
}
