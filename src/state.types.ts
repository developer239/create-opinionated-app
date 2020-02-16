export enum ProjectType {
  CRA = 'cra',
  NEXT = 'next',
  RN = 'rn',
  NEST= 'nest',
}

export enum AppType {
  WEB = 'web',
  MOBILE = 'mobile',
  NODE = 'node',
}

export enum DeploymentType {
  NONE = 'none',
  HEROKU = 'heroku',
}


export enum DatabaseType {
  NONE = 'none',
  SQL = 'sql',
}

export interface IMainState {
  projectFolder: string
  projectName: string
  projectType: ProjectType
  appType: AppType
}
