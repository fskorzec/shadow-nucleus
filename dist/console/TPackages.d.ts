export declare type App = Partial<{
    name: string;
    appName: string;
    shortDescription: string;
    version: string;
    packages: {
        [index: string]: Package;
    };
}>;
export declare type Package = Partial<{
    name: string;
    shortDescription: string;
    description: string;
    commands: {
        [index: string]: Command;
    };
    exemples: Array<string>;
}>;
export declare type Command = Partial<{
    name: string;
    shortDescription: string;
    description: string;
    usages: Array<string>;
    parameters: {
        [index: string]: Parameter;
    };
    exemples: Array<string>;
}>;
export declare type Parameter = Partial<{
    name: string;
    type: string;
    required: boolean;
    description: string;
    exemples: Array<string>;
}>;
//# sourceMappingURL=TPackages.d.ts.map