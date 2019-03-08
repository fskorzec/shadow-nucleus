import {EventEmitter} from "events";

export class TerminalStreamWriter<T> extends EventEmitter implements NodeJS.WritableStream {
  src?: NodeJS.ReadableStream;
  term: T;
  writable: boolean;

 constructor(terminal: T) {
   super();
   this.term = terminal;
   this.writable = true;
 }

  write(buffer: Buffer | string, cb?: Function): boolean;
  write(str: string, encoding?: string, cb?: Function): boolean;
  write(...args: Array<any>): boolean {

    this.emit("write", args);

    if (args[0] === "\u0018") {
      (this.src as any)["setRawMode"](false);
      console.log("End (press enter to exit)");
      process.stdin.removeAllListeners();
      process.stdin.unpipe(this);
    }

    return true;
  }
  end(): void;
  end(buffer: Buffer, cb?: Function): void;
  end(str: string, cb?: Function): void;
  end(str: string, encoding?: string, cb?: Function): void;
  end(...args: Array<any>): void {
    console.log("end", args);
  }
}
