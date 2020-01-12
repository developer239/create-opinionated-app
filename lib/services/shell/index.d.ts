import shelljs from 'shelljs';
export declare const shell: {
    exec: (command: string, silent?: boolean) => shelljs.ShellString;
    execWithSpinner: (command: string, successMessage: string, options?: {
        trim: string;
    } | undefined) => Promise<unknown>;
    execInProject: (projectFolder: string) => (command: string) => shelljs.ShellString;
    execInProjectWithSpinner: (projectFolder: string) => (command: string, successMessage: string) => Promise<unknown>;
};
