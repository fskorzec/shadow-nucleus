import { EventBus }          from "./shared/event/EventBus" ;
import { IEventBus }         from "./core/IEventBus"        ;
import { isNode }            from "./core/util/Env"         ;
import { IModuleEntryPoint } from "./Plugin"                ;
import { Api }               from "./core/api/Api"          ;

export async function startNucleus(parentRequire?: any) {
  const evtBus: IEventBus = new EventBus(".", 3) ;
  const api               = new Api(evtBus)      ;
  
  api.require = parentRequire;
  /*evtBus.on("allEvents", (data) => {
    console.log("*************************************************************************************");
    console.log(data);
  });*/
  
  let globalSystem: any = null;
  
  if (!isNode()) {
    globalSystem = window;
  } else {
    globalSystem = global;
  }
  
  globalSystem["_nucleus_api"] = api;
  globalSystem["_nucleus"] = async (module: unknown) => {
    const mod = module as any;
    await (new mod() as IModuleEntryPoint).entryPoint(api);
    evtBus.emit("API.MODULE.MODULE_LOADED", {mod});
  }

  return;
}
