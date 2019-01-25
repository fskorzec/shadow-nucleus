import { startNucleus} from "../Nucleus"  ;
import { IApi }        from "../Plugin" ;
import * as path       from "path"      ;
import * as fs         from "fs"        ;

declare var _nucleus_api: IApi;
declare var __non_webpack_require__: any;

export async function start(){
  // Start the core api expose it
  await startNucleus(__non_webpack_require__);

  if (fs.existsSync(path.resolve("nucleus.node.js"))) {
    //Load the nucleus engine
    await _nucleus_api.Module.loadModule(path.resolve("nucleus.node.js"));
  }
  
  // Check for the module.conf.json file
  if (fs.existsSync(path.resolve("modules.conf.json"))) {
    // Loads the configuration file
    const jsonConf = JSON.parse(fs.readFileSync(path.resolve("modules.conf.json"), "utf8"));
    
    // Loads each modules
    for(let i=0; i<jsonConf.modules.length; i++) {
      await _nucleus_api.Module.loadModule(path.resolve(jsonConf.modules[i].path));
    }
  } else {
    // Abord if no configuration file is found
    console.log(`${path.resolve("modules.conf.json")} file was not found. Nucleus loading aborted.`)
  }
}