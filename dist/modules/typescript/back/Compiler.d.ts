import { BaseComponent } from "../../../Plugin";
import { TCompileQuery } from "./Events";
import * as ts from "typescript";
export declare class Compiler extends BaseComponent {
    serviceName: string;
    serviceId: string;
    static hasBeenInitialized: boolean;
    private TestProperty;
    constructor();
    protected initialize(): void;
    compile(fileNames: string[], options: ts.CompilerOptions, moduleSearchLocations: Array<string>, data?: TCompileQuery): void;
}
export interface ICompiler {
    new (): ICompiler;
}
//# sourceMappingURL=Compiler.d.ts.map