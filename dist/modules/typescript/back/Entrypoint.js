"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Compiler_1 = require("./Compiler");
const Cli_1 = require("./Cli");
const Plugin_1 = require("../../../Plugin");
const typescript_1 = require("typescript");
class CompilerPackage {
    entryPoint(api) {
        return __awaiter(this, void 0, void 0, function* () {
            const _Compiler = yield api.Service.resolve(Compiler_1.Compiler);
            yield api.Service.registerService(_Compiler.cmpName, _Compiler.cmpId, {
                serviceInstance: _Compiler
            });
            _Compiler["_sendSync"]("CLI.PACKAGE.REGISTER", {
                sender: _Compiler.identity,
                payload: {
                    doc: Cli_1.Doc,
                    runner: (params) => {
                        console.log(`Trying to compile ${params.parameters.src}`);
                        _Compiler.compile([params.parameters["src"]], {
                            target: typescript_1.ScriptTarget.ES2015,
                            lib: ["/src/lib/lib.es2015.d.ts"],
                            module: typescript_1.ModuleKind.CommonJS,
                            jsx: typescript_1.JsxEmit.React,
                            strict: false,
                            esModuleInterop: true,
                            noResolve: true
                        });
                        console.log(`End of compilation process`);
                    }
                }
            });
        });
    }
}
exports.default = CompilerPackage;
Plugin_1.connect(CompilerPackage);
//# sourceMappingURL=Entrypoint.js.map