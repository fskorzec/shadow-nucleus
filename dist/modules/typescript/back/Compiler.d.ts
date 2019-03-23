import { BaseComponent } from "../../../Plugin";
import { TCompileQuery } from "./Events";
import * as ts from "typescript";
export declare class Compiler extends BaseComponent {
    cmpName: string;
    cmpId: string;
    static hasBeenInitialized: boolean;
    constructor();
    protected initialize(): void;
    compile(fileNames: string[], options: ts.CompilerOptions, moduleSearchLocations: Array<string>, data?: TCompileQuery): void;
}
export interface ICompiler {
}
//# sourceMappingURL=Compiler.d.ts.map