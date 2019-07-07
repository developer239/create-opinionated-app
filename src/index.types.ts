export interface IGeneratorState {
  projectFolder: string
  projectName: string
  isDocker: boolean
  ciService: 'none' | 'circleCi'
}
