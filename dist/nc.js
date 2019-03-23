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
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        // Start the core api expose it
        yield Nucleus_1.startNucleus(require);
        if (params.parameters && "verbose" in params.parameters) {
            const cmp = yield _nucleus_api.Service.resolve(Plugin_1.BaseComponent);
            cmp["_EvtBus"] && cmp["_EvtBus"].on("allEvents", (data) => {
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
        // Check for the module.conf.json file
        //if (fs.existsSync(path.resolve("modules.conf.node.json"))) {
        // Loads the configuration file
        //const jsonConf = JSON.parse(fs.readFileSync(path.resolve("modules.conf.node.json"), "utf8"));
        // Loads each modules
        //for(let i=0; i<jsonConf.modules.length; i++) {
        //  await _nucleus_api.Module.loadModule(path.resolve(jsonConf.modules[i].path));
        // }
        // } else {
        // Abord if no configuration file is found
        //  console.log(`${path.resolve("modules.conf.node.json")} file was not found. Nucleus loading aborted.`)
        //}
    });
}
exports.start = start;
const args = process.argv;
const nodeExecpath = args.shift() || "";
const nucleusExecPath = args.shift() || "";
const nucleusExecFolderPath = path.dirname(path.dirname(nucleusExecPath) + "../");
const callerPath = `${path.resolve(".")}`;
const params = Args_1.prepareCliArguments(...args);
(() => __awaiter(this, void 0, void 0, function* () {
    yield start();
}))();
//# sourceMappingURL=nc.js.map