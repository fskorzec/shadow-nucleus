export declare const CLI_ALL_EVENTS = "allEvents";
export declare const CLI_IDENTITY: {
    serviceName: string;
    serviceId: string;
};
export declare type TEnvInfo = {
    args: Array<string>;
    nodeExecpath: string;
    nucleusExecPath: string;
    nucleusExecFolderPath: string;
    callerPath: string;
    params: CommandArgs;
};
export declare type CommandArgs = {
    package: string;
    command: string;
    parameters: {
        [name: string]: string;
    };
};
//# sourceMappingURL=Cli.d.ts.map