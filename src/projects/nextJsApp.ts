import { addBrowserlist } from 'packages/browserslist'
import { addEditorconfig } from 'packages/editorconfig'
import { setUpGitHooks } from 'packages/gitHooks'
import { addFilesToGit } from 'packages/addToGit'
import { addPrettier } from 'packages/prettier'
import { addStylelint } from 'packages/stylelint'
import { addEslint } from 'packages/eslint'
import { initNextJsApp } from 'packages/nextjsapp'

export const createNextJsApp = async () => {
  await initNextJsApp()

  await addEditorconfig()
  await addBrowserlist()
  await addPrettier()
  await addStylelint()
  await addEslint()
  await setUpGitHooks()
  await addFilesToGit()
}
