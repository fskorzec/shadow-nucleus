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
const Events_1 = require("./Events");
const ts = __importStar(require("typescript"));
const path = __importStar(require("path"));
const fs_1 = require("fs");
const Text_1 = require("../../../core/util/Text");
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
            this._Receive(Events_1.Evts.TSC.COMPILER.COMPILE, (data) => {
                this.compile(data.payload.sources, data.payload.options || {}, [], data);
            });
        }
    }
    compile(fileNames, options, moduleSearchLocations, data) {
        ts.getDefaultLibFilePath = (options) => {
            return "/lib";
        };
        let host = ts.createCompilerHost({});
        host.getDefaultLibLocation = (...args) => {
            return "/lib/";
        };
        host.getDefaultLibFileName = (...args) => {
            return "/lib/lib.es6.d.ts";
        };
        options.noEmitOnError = true;
        let program = ts.createProgram(fileNames, options, host);
        program.getCurrentDirectory = null;
        let emitResult = program.emit(undefined, (filePath, fileContent) => {
            function ensureDirectoryExistence(filePath) {
                var dirname = path.dirname(filePath);
                if (fs_1.existsSync(dirname)) {
                    return true;
                }
                ensureDirectoryExistence(dirname);
                fs_1.mkdirSync(dirname);
            }
            ensureDirectoryExistence(filePath);
            fs_1.writeFileSync(filePath, fileContent, { encoding: "utf8", flag: "w" });
            this._SendSync(Events_1.Evts.TSC.COMPILER.WRITE_FILE, {
                sender: this.identity,
                payload: {
                    guid: (data && data.payload.guid) || "CLI",
                    path: filePath,
                    content: fileContent,
                }
            });
        });
        let allDiagnostics = emitResult.diagnostics;
        //.getPreEmitDiagnostics(program)
        //.concat(emitResult.diagnostics);
        allDiagnostics.forEach(diagnostic => {
            if (diagnostic.file) {
                let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
                this._SendSync(Events_1.Evts.TSC.DIAGNOSTIC.ERROR, {
                    sender: this.identity,
                    payload: {
                        guid: (data && data.payload.guid) || "CLI",
                        fileName: diagnostic.file.fileName,
                        message: message,
                        fullMessage: `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`,
                        position: [line + 1, character + 1],
                        innerDiagnostic: Text_1.JSONstringify(diagnostic)
                    }
                });
            }
            else {
                this._SendSync(Events_1.Evts.TSC.DIAGNOSTIC.ERROR, {
                    sender: this.identity,
                    payload: {
                        guid: (data && data.payload.guid) || "CLI",
                        fileName: "",
                        message: "",
                        fullMessage: `${diagnostic.messageText}`,
                        position: [-1, -1],
                        innerDiagnostic: Text_1.JSONstringify(diagnostic)
                    }
                });
            }
        });
        let exitCode = emitResult.emitSkipped ? 1 : 0;
        this._SendSync(Events_1.Evts.TSC.COMPILER.COMPILED, {
            sender: this.identity,
            payload: {
                guid: (data && data.payload.guid) || "CLI",
                exitCode: exitCode
            }
        });
    }
}
Compiler.hasBeenInitialized = false;
exports.Compiler = Compiler;
//# sourceMappingURL=Compiler.js.map