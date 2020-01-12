import { AppType } from 'state.types';
interface IContext {
    appType: AppType;
    projectFolder: string;
}
export declare const addStylelint: (context: IContext) => Promise<void>;
export {};
