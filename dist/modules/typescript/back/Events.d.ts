import { TSendQuery } from "../../../core/BaseComponent";
import { CompilerOptions } from "typescript";
declare const Evts: {
    TSC: {
        COMPILER: {
            COMPILE: string;
            COMPILED: string;
            WRITE_FILE: string;
        };
        DIAGNOSTIC: {
            ERROR: string;
        };
    };
};
export declare type TCompileQuery = TSendQuery<TCompileQueryArg>;
export declare type TCompileQueryArg = {
    guid: string;
    options?: CompilerOptions;
    sources: Array<string>;
};
export declare type TCompilerWriteFile = TSendQuery<TCompilerWriteFileArg>;
export declare type TCompilerWriteFileArg = {
    guid: string;
    path: string;
    content: string;
};
export declare type TDiagnostic = TSendQuery<TDiagnosticArg>;
export declare type TDiagnosticArg = {
    guid: string;
    fileName: string;
    position: [number, number];
    message: string;
    fullMessage: string;
    innerDiagnostic: string;
};
export declare type TCompilerResultQuery = TSendQuery<TCompilerResultQueryArg>;
export declare type TCompilerResultQueryArg = {
    guid: string;
    exitCode: number;
};
export { Evts };
//# sourceMappingURL=Events.d.ts.map