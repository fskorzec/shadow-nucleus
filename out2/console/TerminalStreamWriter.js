"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class TerminalStreamWriter extends events_1.EventEmitter {
    constructor(terminal) {
        super();
        this.term = terminal;
        this.writable = true;
    }
    write(...args) {
        this.emit("write", args);
        if (args[0] === "\u0018") {
            this.src["setRawMode"](false);
            console.log("End (press enter to exit)");
            process.stdin.removeAllListeners();
            process.stdin.unpipe(this);
        }
        return true;
    }
    end(...args) {
        console.log("end", args);
    }
}
exports.TerminalStreamWriter = TerminalStreamWriter;
