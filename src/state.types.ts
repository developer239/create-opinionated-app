export enum ProjectType {
  CRA = 'cra',
  NEXT = 'next',
  RN = 'rn',
}

export enum AppType {
  WEB = 'web',
  MOBILE = 'mobile',
}

export interface IMainState {
  projectFolder: string
  projectName: string
  projectType: ProjectType
  appType: AppType
}
