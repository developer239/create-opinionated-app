import { initGatsby } from 'packages/_Gatsby'
import { addBrowserlist } from 'packages/browserslist'
import { addEditorconfig } from 'packages/editorconfig'
import { addEslint } from 'packages/eslint'
import { addFilesToGit } from 'packages/git/add'
import { setUpGitHooks } from 'packages/git/hooks'
import { addPrettier } from 'packages/prettier'
import { addStylelint } from 'packages/stylelint'
import { AppType, IMainState } from 'state.types'

export const createGatsbyApp = async (context: IMainState) => {
  await initGatsby({
    projectFolder: context.projectFolder,
    projectName: context.projectName,
  })

  await addEditorconfig()
  await addBrowserlist()
  await addPrettier({ projectFolder: context.projectFolder })
  await addStylelint({
    appType: context.appType,
    projectFolder: context.projectFolder,
  })
  await addEslint({ appType: context.appType, projectFolder: context.projectFolder })

  await setUpGitHooks({
    appType: AppType.WEB,
  })

  await addFilesToGit({ projectFolder: context.projectFolder })
}
