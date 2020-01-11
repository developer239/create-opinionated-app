import { addBrowserlist } from 'packages/browserslist'
import { addEditorconfig } from 'packages/editorconfig'
import { addFilesToGit } from 'packages/git/add'
import { setUpGitHooks } from 'packages/git/hooks'
import { addPrettier } from 'packages/prettier'
import { addStylelint } from 'packages/stylelint'
import { addEslint } from 'packages/eslint'
import { initNextJsApp } from 'packages/_NextJs'
import { IMainState } from 'state.types'

export const createNextJsApp = async (context: IMainState) => {
  // Init app
  await initNextJsApp({
    projectName: context.projectName,
    projectFolder: context.projectFolder,
  })

  // Code quality tools
  await addEditorconfig()
  await addBrowserlist()
  await addPrettier({ projectFolder: context.projectFolder })
  await addStylelint({
    projectType: context.projectType,
    appType: context.appType,
    projectFolder: context.projectFolder,
  })
  await addEslint({ projectType: context.projectType, appType: context.appType, projectFolder: context.projectFolder })

  // Git hooks
  await setUpGitHooks()

  // Commit and share on GitHub
  await addFilesToGit({ projectFolder: context.projectFolder })
}
