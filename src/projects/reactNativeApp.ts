import { initReactNativeApp } from 'packages/reactnativeapp'
import { addEditorconfig } from 'packages/editorconfig'
import { addPrettier } from 'packages/prettier'
import { addStylelint } from 'packages/stylelint'
import { addEslint } from 'packages/eslint'
import { setUpGitHooks } from 'packages/gitHooks'
import { addFilesToGit } from 'packages/addToGit'

export const createReactNativeApp = async () => {
  await initReactNativeApp()

  await addEditorconfig()
  await addPrettier()
  await addStylelint()
  await addEslint()
  await setUpGitHooks()
  await addFilesToGit()
}
