import { EventBus }  from "./shared/event/EventBus" ;
import { IEventBus } from "./core/IEventBus"        ;
import { isNode } from "./core/util/Env";
import { IModuleEntryPoint } from "./Plugin";
import { Api } from "./core/api/Api";

const evtBus: IEventBus = new EventBus(".", 3);
const api = new Api(evtBus);

evtBus.on("allEvents", (data) => {
  console.log("*************************************************************************************");
  console.log(data);
});

if (!isNode()) {
  (window as unknown as any)["_nucleus_api"] = api;
  (window as unknown as any)["_nucleus"] = (module: unknown) => {
    const mod = module as any;
    (new mod() as IModuleEntryPoint).entryPoint(api);
    evtBus.emit("API.MODULE.MODULE_LOADED", {mod});
  }
} else {
  (global as unknown as any)["_nucleus_api"] = api;
  (global as unknown as any)["_nucleus"] = (module: unknown) => {
    const mod = module as any;
    (new mod() as IModuleEntryPoint).entryPoint(api);
    evtBus.emit("API.MODULE.MODULE_LOADED", {mod});
  }
}
