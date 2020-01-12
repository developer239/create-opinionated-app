export declare const addDependencies: (name: string, libraries: string[], isDev?: boolean) => Promise<unknown>;
export declare const removeDependencies: (name: string, libraries: string[]) => Promise<unknown>;
export declare const moveToDevDependencies: (name: string, libraries: string[]) => Promise<unknown>;
export declare const removeFiles: (name: string, files: string[], recursive?: boolean) => Promise<unknown>;
export declare const makeDir: (name: string) => Promise<unknown>;
