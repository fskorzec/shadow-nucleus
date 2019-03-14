#!/usr/bin/env node
import { Terminal } from "./console/Terminal";
import { IColor16Terminal } from "./console/core/Constant";
import { prepareCliArguments, CommandArgs } from "./console/Args";
import { App, Package, Command } from "./console/TPackages";
import { promises } from "fs";
import { startNucleus} from "./Nucleus"  ;
import { IApi }        from "./Plugin" ;
import * as path       from "path"      ;
import * as fs         from "fs"        ;
import { Api } from "./core/api/Api";

declare var _nucleus_api: IApi;
declare var __non_webpack_require__: any;

export async function start(){
  // Start the core api expose it
  await startNucleus(require);

  if (fs.existsSync(`${nucleusExecFolderPath}/dist/_packages/modules/nc-cli/1.0.0/back/nc-cli.js`)) {
    //Load the nucleus cli plugin
    await _nucleus_api.Module.loadModule(`${nucleusExecFolderPath}/dist/_packages/modules/nc-cli/1.0.0/back/nc-cli.js`);
  } else {
    console.log("Cannot find cli package in global installation")
  }

 (_nucleus_api as Api)._evtBus.emit("CLI.RUNNER.EXECUTE", {
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
}



const args =process.argv;
const nodeExecpath = args.shift() || "";
const nucleusExecPath = args.shift() || "";

const nucleusExecFolderPath = path.dirname(path.dirname(nucleusExecPath) + "../");
const callerPath = `${path.resolve(".")}`;

const params = prepareCliArguments(...args);

(async () => {
  await start();
})()



