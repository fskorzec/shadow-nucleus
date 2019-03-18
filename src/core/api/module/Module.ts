import { IEventBus } from "../../IEventBus" ;
import { isNode }    from "../../util/Env"  ;
import { Acts, Evts }      from "./Events"        ;
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
    return new Promise<void>((r,x) => {
      this._evtBus.once(Evts.API.MODULE.MODULE_LOADED, () => {
        r();
      });

      if (isNode()) {
        this._evtBus.emit(Acts.API.MODULE.LOAD_MODULE, {path});
        (this._api as any)["_require"](path);
      } else {
        this._evtBus.emit(Acts.API.MODULE.LOAD_MODULE, {path});
        const scriptTag = document.createElement("script");
        scriptTag.type = "text/javascript";
        scriptTag.src = path;
        window.document.body.appendChild(scriptTag);
      }
    })
  }
}
