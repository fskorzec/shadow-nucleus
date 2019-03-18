import { BaseComponent } from "../../../Plugin";
import * as ts from "typescript";
export declare class Compiler extends BaseComponent {
    cmpName: string;
    cmpId: string;
    static hasBeenInitialized: boolean;
    constructor();
    protected initialize(): void;
    compile(fileNames: string[], options: ts.CompilerOptions): void;
}
export interface ICompiler {
}
//# sourceMappingURL=Compiler.d.ts.map