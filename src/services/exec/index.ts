import { state } from '../../state'
import { shell } from '../shell'

export const addDependencies = (name: string, libraries: string[], isDev = false) =>
  shell.execInProjectWithSpinner(state.projectFolder)(
    `yarn add ${libraries.join(' ')} ${isDev ? '-D' : ''}`,
    `[dependencies][add] ${name}`
  )

export const moveToDevDependencies = (name: string, libraries: string[]) =>
  shell.execInProjectWithSpinner(state.projectFolder)(
    `yarn remove ${libraries.join(' ')} && yarn add ${libraries.join(' ')} -D`,
    `[dependencies][move] ${name}`
  )

export const removeFiles = (name: string, files: string[], recursive = false) =>
  shell.execInProjectWithSpinner(state.projectName)(
    `rm ${recursive ? '-r' : ''} ${files.join(' ')}`,
    `[fs][remove files] ${name}`
  )

export const makeDir = (name: string) =>
  shell.execInProjectWithSpinner(state.projectName)(
    `mkdir ${name}`,
    `[fs][make dir] ${name}`
  )