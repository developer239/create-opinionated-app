import { addEditorconfig } from 'packages/editorconfig'
import { addEslint } from 'packages/eslint'
import { setUpGitHooks } from 'packages/git/hooks'
import { addPrettier } from 'packages/prettier'
import { addTypescript } from 'packages/typescript'
import { shell } from 'services/shell'
import { IMainState } from 'state.types'

export const createNodeCliApp = async (context: IMainState) => {
  shell.exec(`mkdir ${context.projectFolder}`)
  shell.execInProject(context.projectFolder)('yarn init -y')
  await addEditorconfig()
  await addPrettier({ projectFolder: context.projectFolder })
  await addEslint({ appType: context.appType, projectFolder: context.projectFolder })
  await setUpGitHooks({
    appType: context.appType,
  })
  await addTypescript({
    projectFolder: context.projectFolder,
    appType: context.appType,
  })
}
