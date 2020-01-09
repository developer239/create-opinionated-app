import { addBrowserlist } from 'packages/browserslist'
import { initReactApp } from 'packages/_CreateReactApp'
import { addEditorconfig } from 'packages/editorconfig'
import { setUpGitHooks } from 'packages/git/hooks'
import { addFilesToGit } from 'packages/git/add'
import { addPrettier } from 'packages/prettier'
import { addStylelint } from 'packages/stylelint'
import { addEslint } from 'packages/eslint'
import { IMainState } from 'state.types'

export const createReactApp = async (context: IMainState) => {
  // Init app
  await initReactApp({
    projectFolder: context.projectFolder,
    projectName: context.projectName,
  })

  // Code quality tools
  await addEditorconfig()
  await addBrowserlist()
  await addPrettier({ projectFolder: context.projectFolder })
  await addStylelint({ appType: context.appType })
  await addEslint({ projectType: context.projectType, appType: context.appType, projectFolder: context.projectFolder })

  // Git hooks
  await setUpGitHooks()

  // Commit and share on GitHub
  await addFilesToGit({ projectFolder: context.projectFolder })
}
