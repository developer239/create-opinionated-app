import { shell } from 'services/shell'
import { state } from 'state'

export const addDependencies = (name: string, libraries: string[], isDev = false) =>
  shell.execInProjectWithSpinner(state.projectFolder)(
    `yarn add ${libraries.join(' ')} ${isDev ? '-D' : ''}`,
    `[dependencies][add] ${name}`
  )

export const removeDependencies = (name: string, libraries: string[]) =>
  shell.execInProjectWithSpinner(state.projectFolder)(
    `yarn remove ${libraries.join(' ')}`,
    `[dependencies][remove] ${name}`
  )

export const moveToDevDependencies = (name: string, libraries: string[]) =>
  shell.execInProjectWithSpinner(state.projectFolder)(
    `yarn remove ${libraries.join(' ')} && yarn add ${libraries.join(' ')} -D`,
    `[dependencies][move] ${name}`
  )

export const removeFiles = (name: string, files: string[], recursive = false) =>
  shell.execInProjectWithSpinner(state.projectFolder)(
    `rm ${recursive ? '-r' : ''} ${files.join(' ')}`,
    `[fs][remove files] ${name}`
  )

export const makeDir = (name: string) =>
  shell.execWithSpinner(
    `mkdir ${name}`,
    `[fs][make dir] ${name}`
  )
