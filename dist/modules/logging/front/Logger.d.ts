import { BaseComponent } from "../../../Plugin";
export declare class Logger extends BaseComponent {
    cmpName: string;
    cmpId: string;
    static hasBeenInitialized: boolean;
    constructor();
    protected initialize(): void;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
}
export interface ILogger {
    log(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
}
//# sourceMappingURL=Logger.d.ts.map