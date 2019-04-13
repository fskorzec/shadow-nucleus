#!/usr/bin/env node
import { prepareCliArguments }          from "./console/Args"                ;
import { startNucleus}                  from "./Nucleus"                     ;
import { IApi, BaseComponent }          from "./Plugin"                      ;
import * as path                        from "path"                          ;
import * as fs                          from "fs"                            ;
import { Api }                          from "./core/api/Api"                ;
import { buildQueryResult }             from "./core/util/Event"             ;
import { _package }                     from "./modules/cli/back/doc/Module" ;
import { IPrivateBaseComponent }        from "./core/BaseComponent"          ;
import { CLI_ALL_EVENTS, CLI_IDENTITY } from "./core/constant/Cli"           ;

declare var _nucleus_api            : IApi ; 
declare var __non_webpack_require__ : any  ; // only use this one if this file is packaged with webpack

export async function start(){
  // Start the core api expose it
  await startNucleus(require);
  
  // used to access to the EventBus
  const cmp = await _nucleus_api.Service.resolve<IPrivateBaseComponent>(BaseComponent);

  cmp._Receive<any>("CLI.ENV.GET_INFO", (data) => {
    cmp._Send("CLI.ENV.INFO_GOTTEN", buildQueryResult(
      CLI_IDENTITY, 
      data, 
      {
        args                  ,
        nodeExecpath          ,
        nucleusExecPath       ,
        nucleusExecFolderPath ,
        callerPath            ,
        params
      })
    );
  });

  if (params.parameters && "verbose" in params.parameters) {

    cmp._EvtBus && cmp._EvtBus.on(CLI_ALL_EVENTS, (data) => {
      console.log("*************************************************************************************");
      console.log(data);
      console.log("*************************************************************************************");
      console.log("");
    });
  }

  if (fs.existsSync(`${nucleusExecFolderPath}/dist/_packages/modules/nc-cli/1.0.0/back/nc-cli.js`)) {
    //Load the nucleus cli plugin
    await _nucleus_api.Module.loadModule(`${nucleusExecFolderPath}/dist/_packages/modules/nc-cli/1.0.0/back/nc-cli.js`);
  } else {
    console.log("Cannot find cli package in global installation");
  }

  if (fs.existsSync(`${nucleusExecFolderPath}/dist/_packages/modules/typescript/3.3.3/back/typescript.js`)) {
    //Load the typescript cli plugin
    await _nucleus_api.Module.loadModule(`${nucleusExecFolderPath}/dist/_packages/modules/typescript/3.3.3/back/typescript.js`);
  } else {
    console.log("Cannot find typescript plugin, will fallback to global installation if exists")
  }
 
  (_nucleus_api as Api)._evtBus.emit("CLI.RUNNER.EXECUTE", {
    payload: params
  });
}

const args            =       process.argv ;
const nodeExecpath    = args.shift() || "" ;
const nucleusExecPath = args.shift() || "" ;

const nucleusExecFolderPath = path.dirname(path.dirname(nucleusExecPath) + "../");
const callerPath = `${path.resolve(".")}`;

const params = prepareCliArguments(...args);

(async () => {
  await start();
})();
