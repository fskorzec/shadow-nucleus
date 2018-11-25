import { IEventBus } from "../../IEventBus" ;
import { isNode }    from "../../util/Env"  ;
import { Acts }      from "./Events"        ;
import { IModule }   from "./IModule"       ;
import { IApi }      from "../../../Plugin" ;

export class Module implements IModule {
  private _evtBus    : IEventBus                  ;
  private _moduleMap : { [key: string]: unknown } ;
  private _api       : IApi                       ;

  constructor(evtBus: IEventBus, api: IApi) {
    this._evtBus    = evtBus ;
    this._moduleMap = {}     ;
    this._api       = api    ;
  }

  async loadModule(path: string): Promise<void> {
    if (isNode()) {
      (this._api as any)["_require"](path);
      this._evtBus.emit(Acts.API.MODULE.LOAD_MODULE, {path});
    } else {
      const scriptTag = document.createElement("script");
      scriptTag.type = "text/javascript";
      scriptTag.src = path;
      window.document.body.appendChild(scriptTag);
      this._evtBus.emit(Acts.API.MODULE.LOAD_MODULE, {path});
    }
  }
}
