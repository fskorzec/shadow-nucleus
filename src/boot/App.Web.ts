import { startNucleus} from "../Nucleus"  ;
import { IApi }        from "../Plugin" ;

declare var _nucleus_api: IApi;

export async function start(){
  // Start the core api expose it
  await startNucleus();
  //Load the nucleus engine
  await _nucleus_api.Module.loadModule("nucleus.node.js");
  
  // Check for the module.conf.json file
  try {
    const jsonConf = await(await fetch("modules.conf.json")).json();

    for(let i=0; i<jsonConf.modules.length; i++) {
      await _nucleus_api.Module.loadModule(jsonConf.modules[i].path);
    }
  } catch(ex) {
    console.log(`modules.conf.json file was not found. Nucleus loading aborted.`);
  }
}