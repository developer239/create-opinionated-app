interface IOptions {
    name: string;
    source: string;
    destination: string;
    context?: Object;
}
export declare const generate: ({ name, source, destination, context, }: IOptions) => Promise<void>;
export {};
