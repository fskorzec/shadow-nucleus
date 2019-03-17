export declare const Doc: Partial<Partial<{
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
//# sourceMappingURL=Cli.d.ts.map