"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Plugin_1 = require("../../../Plugin");
const ts = __importStar(require("typescript"));
class Compiler extends Plugin_1.BaseComponent {
    constructor() {
        super();
        this.cmpName = "tsc";
        this.cmpId = "com.nucleus";
    }
    initialize() {
        if (Compiler.hasBeenInitialized) {
            return;
        }
        else {
            Compiler.hasBeenInitialized = true;
        }
    }
    compile(fileNames, options) {
        let program = ts.createProgram(fileNames, options);
        let emitResult = program.emit();
        let allDiagnostics = ts
            .getPreEmitDiagnostics(program)
            .concat(emitResult.diagnostics);
        allDiagnostics.forEach(diagnostic => {
            if (diagnostic.file) {
                let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
                console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            }
            else {
                console.log(`${ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")}`);
            }
        });
        let exitCode = emitResult.emitSkipped ? 1 : 0;
        console.log(`Process exiting with code '${exitCode}'.`);
        process.exit(exitCode);
    }
}
Compiler.hasBeenInitialized = false;
exports.Compiler = Compiler;
//# sourceMappingURL=Compiler.js.map