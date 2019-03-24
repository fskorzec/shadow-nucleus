"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Compiler_1;
const Plugin_1 = require("../../../Plugin");
const Events_1 = require("./Events");
const ts = __importStar(require("typescript"));
const Text_1 = require("../../../core/util/Text");
const Ioc_1 = require("../../../core/util/Ioc");
let Compiler = Compiler_1 = class Compiler extends Plugin_1.BaseComponent {
    constructor() {
        super();
        this.serviceName = "tsc";
        this.serviceId = "com.nucleus";
    }
    initialize() {
        if (Compiler_1.hasBeenInitialized) {
            return;
        }
        else {
            Compiler_1.hasBeenInitialized = true;
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
            /*function ensureDirectoryExistence(filePath: string) {
              var dirname = path.dirname(filePath);
              if (existsSync(dirname)) {
                return true;
              }
              ensureDirectoryExistence(dirname);
              mkdirSync(dirname);
            }
            ensureDirectoryExistence(filePath);
            writeFileSync(filePath,fileContent,{encoding:"utf8", flag:"w"});*/
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
};
Compiler.hasBeenInitialized = false;
Compiler = Compiler_1 = __decorate([
    Ioc_1.IocInject("ICompiler")
], Compiler);
exports.Compiler = Compiler;
