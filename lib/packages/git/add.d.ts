interface IContext {
    projectFolder: string;
}
export declare const addFilesToGit: (context: IContext) => Promise<void>;
export {};
