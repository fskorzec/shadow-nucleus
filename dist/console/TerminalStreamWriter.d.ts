/// <reference types="node" />
import { EventEmitter } from "events";
export declare class TerminalStreamWriter<T> extends EventEmitter implements NodeJS.WritableStream {
    src?: NodeJS.ReadableStream;
    term: T;
    writable: boolean;
    constructor(terminal: T);
    write(buffer: Buffer | string, cb?: Function): boolean;
    write(str: string, encoding?: string, cb?: Function): boolean;
    end(): void;
    end(buffer: Buffer, cb?: Function): void;
    end(str: string, cb?: Function): void;
    end(str: string, encoding?: string, cb?: Function): void;
}
//# sourceMappingURL=TerminalStreamWriter.d.ts.map