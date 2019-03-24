"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Guid_1 = require("../../../../shared/text/Guid");
const Events_1 = require("../../../typescript/back/Events");
const path = __importStar(require("path"));
const fs_1 = require("fs");
class Build {
    static buildModule(modulePath, target) {
        return __awaiter(this, void 0, void 0, function* () {
            const compileStepGuid = Guid_1.Guid.getGuid();
            let compiledFiles = {};
            let compiledErrors = {};
            this._Receive(Events_1.Evts.TSC.COMPILER.WRITE_FILE, data => {
                compiledFiles["_filled"] = "true";
                compiledFiles[data.payload.path] = data.payload.content;
            });
            this._Receive(Events_1.Evts.TSC.DIAGNOSTIC.ERROR, data => {
                compiledErrors["_filled"] = true;
                compiledErrors[data.payload.fileName] = data.payload;
            });
            try {
                const compileresult = yield this._SendWithReturn(Events_1.Evts.TSC.COMPILER.COMPILE, Events_1.Evts.TSC.COMPILER.COMPILED, {
                    sender: this.identity,
                    payload: {
                        guid: compileStepGuid,
                        sources: [modulePath],
                        options: {
                            target: 2,
                            module: 1,
                            jsx: 2,
                            strict: false,
                            esModuleInterop: true,
                            experimentalDecorators: true,
                            outDir: "./out2"
                        }
                    }
                });
                console.log("AFTER COMPILE");
            }
            catch (ex) {
                console.log("Error", ex);
            }
            if (compiledErrors._filled) {
                //console.log("Errors", compiledErrors)
            }
            if (compiledFiles._filled) {
                var regexIocResolve = new RegExp('__decorate\\(\\[.*?IocResolve\\((.*?)\\).*?\\],\\s*(.*?),\\s*"(.*?)"', 'is');
                var regexIocInject = new RegExp('(\\w*?) = __decorate\\(\\[.*?IocInject\\((.*?)\\).*?\\],\\s*(.*?)\\);', 'is');
                function ensureDirectoryExistence(filePath) {
                    var dirname = path.dirname(filePath);
                    if (fs_1.existsSync(dirname)) {
                        return true;
                    }
                    ensureDirectoryExistence(dirname);
                    fs_1.mkdirSync(dirname);
                }
                for (let i in compiledFiles) {
                    if (i !== "_filled") {
                        var match = regexIocResolve.exec(compiledFiles[i]);
                        if (match) {
                            console.log(`Resolve request detected in file ${i}, Property ${match[3]} in class ${match[2].split(".")[0]} is of type ${match[1]}`);
                        }
                        var match = regexIocInject.exec(compiledFiles[i]);
                        if (match) {
                            var regexName = new RegExp(match[1] + ' = class ' + match[3] + ' extends .*?this\\.serviceName = "(.*?)"', 'is').exec(compiledFiles[i]);
                            var regexId = new RegExp(match[1] + ' = class ' + match[3] + ' extends .*?this\\.serviceId = "(.*?)"', 'is').exec(compiledFiles[i]);
                            console.log(`Inject request detected in file ${i}, Class ${match[3]} whose generated name is ${match[1]} is registered in module { name : ${regexName && regexName[1]}, id: ${regexId && regexId[1]} as type ${match[2]}}`);
                        }
                    }
                    ensureDirectoryExistence(i);
                    fs_1.writeFileSync(i, compiledFiles[i], { encoding: "utf8", flag: "w" });
                }
            }
        });
    }
}
exports.Build = Build;
//# sourceMappingURL=Build.js.map