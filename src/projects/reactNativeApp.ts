import { initReactNativeApp } from 'packages/_ReactNative'
import { addEditorconfig } from 'packages/editorconfig'
import { addPrettier } from 'packages/prettier'
import { addStylelint } from 'packages/stylelint'
import { addEslint } from 'packages/eslint'
import { addFilesToGit } from 'packages/git/add'
import { setUpGitHooks } from 'packages/git/hooks'
import { IMainState } from 'state.types'

export const createReactNativeApp = async (context: IMainState) => {
  // Init app
  await initReactNativeApp({
    projectFolder: context.projectFolder,
    projectName: context.projectName,
  })

  // Code quality tools
  await addEditorconfig()
  await addPrettier({ projectFolder: context.projectFolder })
  await addStylelint({ appType: context.appType, projectFolder: context.projectFolder })
  await addEslint({ appType: context.appType, projectFolder: context.projectFolder })

  // Git hooks
  await setUpGitHooks()

  // Commit and share on Github
  await addFilesToGit({ projectFolder: context.projectFolder })
}
