import { prompt } from 'inquirer'
import { addBrowserlist } from 'packages/browserslist'
import { addDocker } from 'packages/docker'
import { initReactApp } from 'packages/reactapp'
import { addRouter } from 'packages/reactapp/actions/router'
import { addApollo, addRedux } from 'packages/reactapp/actions/state'
import { cleanPackageJson } from 'packages/reactapp/actions/packageJson'
import { addReadme } from 'packages/reactapp/actions/readme'
import { addHeroku } from 'packages/heroku'
import { addEditorconfig } from 'packages/editorconfig'
import { setUpGitHooks } from 'packages/gitHooks'
import { replaceSourceFiles } from 'packages/reactapp/actions/srcFiles'
import { addFilesToGit } from 'packages/addToGit'
import { addPrettier } from 'packages/prettier'
import { addStylelint } from 'packages/stylelint'
import { addEslint } from 'packages/eslint'

// eslint-disable-next-line max-lines-per-function
export const createReactApp = async () => {
  const { isRouter } = await prompt({
    name: 'isRouter',
    type: 'list',
    message: 'Do you want to use router?',
    choices: [{ name: 'no', value: false }, { name: 'yes', value: true }],
  })

  const { stateManagement } = await prompt({
    name: 'stateManagement',
    type: 'list',
    message: 'What library do you want to use to manage state?',
    choices: [
      { name: 'none', value: 'none' },
      { name: 'Apollo GraphQL', value: 'apollo' },
      { name: 'Redux', value: 'redux' },
    ],
  })

  const { isDocker } = await prompt({
    name: 'isDocker',
    type: 'list',
    message: 'Do you want to use docker 🐳?',
    choices: [{ name: 'no', value: false }, { name: 'yes', value: true }],
  })

  const { cdService } = await prompt({
    name: 'cdService',
    type: 'list',
    message: 'What hosting service do you want to use?',
    choices: [
      { name: 'none 🚫', value: 'none' },
      { name: 'Heroku', value: 'heroku' },
    ],
  })

  await initReactApp()
  await cleanPackageJson()
  await addReadme({ isDocker, isHeroku: cdService === 'heroku' })

  if (cdService === 'heroku') {
    await addHeroku()
  }

  if (isDocker) {
    await addDocker()

  }

  await addEditorconfig()
  await addBrowserlist()
  await addPrettier()
  await addStylelint()
  await addEslint()
  await setUpGitHooks()
  await replaceSourceFiles({
    isApollo: stateManagement === 'apollo',
    isRedux: stateManagement === 'redux',
    isRouter,
  })

  if (isRouter) {
    await addRouter()

  }

  if (stateManagement === 'redux') {
    await addRedux()
  }

  if (stateManagement === 'apollo') {
    await addApollo()
  }

  await addFilesToGit()
}
