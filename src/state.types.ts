export enum ProjectType {
  CRA,
  NEXT,
  RN,
}

export interface IMainState {
  projectFolder: string
  projectName: string
  projectType: ProjectType
}
