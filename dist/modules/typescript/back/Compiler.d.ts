import { BaseComponent } from "../../../Plugin";
import * as ts from "typescript";
export declare class Compiler extends BaseComponent {
    cmpName: string;
    cmpId: string;
    static hasBeenInitialized: boolean;
    constructor();
    protected initialize(): void;
    createCompilerHost(options: ts.CompilerOptions, moduleSearchLocations: string[]): ts.CompilerHost;
    compile(fileNames: string[], options: ts.CompilerOptions, moduleSearchLocations: Array<string>): void;
}
export interface ICompiler {
}
//# sourceMappingURL=Compiler.d.ts.map