export declare type Section = {
    description: string;
    exports: Array<string>;
    dependsOn: {
        [index: string]: {
            version: null | string;
        };
    };
};
export declare type Package = {
    [name: string]: Section | string | undefined;
    namespace: string;
    name: string;
    version: string;
    description: string;
    back?: Section;
    front?: Section;
};
export declare type Project = {
    main: Package;
    binaries: Array<Package>;
};
//# sourceMappingURL=Package.d.ts.map