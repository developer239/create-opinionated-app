interface IOptions {
    projectName: string;
    message: string;
    messageSuccess: string;
}
export declare const json: {
    update: (fileName: string) => ({ projectName, message, messageSuccess }: IOptions, updateFile: (packageJson: any) => Promise<any>) => Promise<void>;
};
export {};
