export declare const module: Partial<Partial<{
    name: string;
    shortDescription: string;
    description: string;
    commands: {
        [index: string]: Partial<{
            name: string;
            shortDescription: string;
            description: string;
            usages: string[];
            parameters: {
                [index: string]: Partial<{
                    name: string;
                    type: string;
                    required: boolean;
                    description: string;
                    exemples: string[];
                }>;
            };
            exemples: string[];
        }>;
    };
    exemples: string[];
}>>;
export declare const _package: Partial<Partial<{
    name: string;
    shortDescription: string;
    description: string;
    commands: {
        [index: string]: Partial<{
            name: string;
            shortDescription: string;
            description: string;
            usages: string[];
            parameters: {
                [index: string]: Partial<{
                    name: string;
                    type: string;
                    required: boolean;
                    description: string;
                    exemples: string[];
                }>;
            };
            exemples: string[];
        }>;
    };
    exemples: string[];
}>>;
export declare const AppDoc: Partial<{
    name: string;
    appName: string;
    shortDescription: string;
    version: string;
    packages: {
        [index: string]: Partial<{
            name: string;
            shortDescription: string;
            description: string;
            commands: {
                [index: string]: Partial<{
                    name: string;
                    shortDescription: string;
                    description: string;
                    usages: string[];
                    parameters: {
                        [index: string]: Partial<{
                            name: string;
                            type: string;
                            required: boolean;
                            description: string;
                            exemples: string[];
                        }>;
                    };
                    exemples: string[];
                }>;
            };
            exemples: string[];
        }>;
    };
}>;
//# sourceMappingURL=Module.d.ts.map