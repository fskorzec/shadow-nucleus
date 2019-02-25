import { startNucleus} from "../Nucleus" ;
import { IApi }        from "../Plugin"  ;

declare var _nucleus_api: IApi;

export async function start(){
  const dataPath = (document.currentScript as HTMLScriptElement).getAttribute("data-path") || "";

  // Start the core api expose it
  await startNucleus();
  try {
    //Load the nucleus engine
    await _nucleus_api.Module.loadModule(`${dataPath}/nucleus.web.js`);
  } catch { /** Module does not exists */}
  
  // Check for the module.conf.json file
  try {
    const jsonConf = await(await fetch(`${dataPath}/modules.conf.web.json`)).json();

    for(let i=0; i<jsonConf.modules.length; i++) {
      await _nucleus_api.Module.loadModule(`${dataPath}/${jsonConf.modules[i].path}`);
    }
  } catch(ex) {
    console.log(`modules.conf.web.json file was not found. Nucleus loading aborted.`);
  }
}