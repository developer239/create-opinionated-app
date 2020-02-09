import { prompt } from 'inquirer'
import { addBrowserlist } from 'packages/browserslist'
import { addEditorconfig } from 'packages/editorconfig'
import { addFilesToGit } from 'packages/git/add'
import { setUpGitHooks } from 'packages/git/hooks'
import { addPrettier } from 'packages/prettier'
import { addStylelint } from 'packages/stylelint'
import { addEslint } from 'packages/eslint'
import { initNextJsApp } from 'packages/_NextJs'
import { addCypress } from 'packages/cypress'
import { IMainState } from 'state.types'

export const createNextJsApp = async (context: IMainState) => {
  // Init app
  await initNextJsApp({
    projectName: context.projectName,
    projectFolder: context.projectFolder,
  })

  const { isCypress } = await prompt({
    name: 'isCypress',
    type: 'list',
    message: 'Do you want to use cypress?',
    choices: [
      { name: 'No', value: false },
      { name: 'Yes', value: true },
    ],
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
