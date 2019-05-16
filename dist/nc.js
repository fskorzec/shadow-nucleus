#!/usr/bin/env node
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
const Args_1 = require("./console/Args");
const Nucleus_1 = require("./Nucleus");
const Plugin_1 = require("./Plugin");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const Event_1 = require("./core/util/Event");
const Cli_1 = require("./core/constant/Cli");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        // Start the core api expose it
        yield Nucleus_1.startNucleus(require);
        // used to access to the EventBus
        const cmp = yield _nucleus_api.Service.resolve(Plugin_1.BaseComponent);
        cmp._Receive("CLI.ENV.GET_INFO", (data) => {
            cmp._Send("CLI.ENV.INFO_GOTTEN", Event_1.buildQueryResult(Cli_1.CLI_IDENTITY, data, {
                args,
                nodeExecpath,
                nucleusExecPath,
                nucleusExecFolderPath,
                callerPath,
                params
            }));
        });
        if (params.parameters && "verbose" in params.parameters) {
            cmp._EvtBus && cmp._EvtBus.on(Cli_1.CLI_ALL_EVENTS, (data) => {
                console.log("*************************************************************************************");
                console.log(data);
                console.log("*************************************************************************************");
                console.log("");
            });
        }
        if (fs.existsSync(`${nucleusExecFolderPath}/dist/_packages/modules/nc-cli/1.0.0/back/nc-cli.js`)) {
            //Load the nucleus cli plugin
            yield _nucleus_api.Module.loadModule(`${nucleusExecFolderPath}/dist/_packages/modules/nc-cli/1.0.0/back/nc-cli.js`);
        }
        else {
            console.log("Cannot find cli package in global installation");
        }
        if (fs.existsSync(`${nucleusExecFolderPath}/dist/_packages/modules/typescript/3.3.3/back/typescript.js`)) {
            //Load the typescript cli plugin
            yield _nucleus_api.Module.loadModule(`${nucleusExecFolderPath}/dist/_packages/modules/typescript/3.3.3/back/typescript.js`);
        }
        else {
            console.log("Cannot find typescript plugin, will fallback to global installation if exists");
        }
        _nucleus_api._evtBus.emit("CLI.RUNNER.EXECUTE", {
            payload: params
        });
    });
}
exports.start = start;
const args = process.argv;
const nodeExecpath = args.shift() || "";
const nucleusExecPath = args.shift() || "";
let nucleusExecFolderPath = path.dirname(path.dirname(nucleusExecPath) + "../");
const callerPath = `${path.resolve(".")}`;
let ncPath = fs.existsSync(nucleusExecFolderPath + "/dist/_packages/modules");
if (!ncPath) {
    ncPath = fs.existsSync(nucleusExecFolderPath + "/shadow-nucleus" + "/dist/_packages/modules");
    if (ncPath) {
        nucleusExecFolderPath += "/shadow-nucleus";
    }
}
if (!ncPath) {
    ncPath = fs.existsSync(nucleusExecFolderPath + "/node_modules/shadow-nucleus" + "/dist/_packages/modules");
    if (ncPath) {
        nucleusExecFolderPath += "/node_modules/shadow-nucleus";
    }
}
if (!ncPath) {
    ncPath = fs.existsSync(nucleusExecFolderPath + "/lib/node_modules/shadow-nucleus" + "/dist/_packages/modules");
    if (ncPath) {
        nucleusExecFolderPath += "/lib/node_modules/shadow-nucleus";
    }
}
if (!ncPath) {
    nucleusExecFolderPath = "--";
}
const params = Args_1.prepareCliArguments(...args);
if (params.parameters && "show_env" in params.parameters) {
    console.log({
        nodeExecpath,
        nucleusExecPath,
        nucleusExecFolderPath,
        callerPath
    });
}
(() => __awaiter(this, void 0, void 0, function* () {
    yield start();
}))();
//# sourceMappingURL=nc.js.map