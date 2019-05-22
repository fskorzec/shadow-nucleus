import { Service }   from "./service/Service"  ;
import { IService }  from "./service/IService" ;
import { IEventBus } from "../IEventBus"       ;
import { IApi }      from "./IApi"             ;
import { IModule }   from "./module/IModule"   ;
import { Module }    from "./module/Module"    ;

export class Api implements IApi{
  _evtBus  : IEventBus ;
  _service : Service   ;
  _module  : Module    ;
  _require : any       ;

  constructor(evtBus: IEventBus) {
    this._evtBus  = evtBus                   ;
    this._service = new Service(evtBus)      ;
    this._module  = new Module(evtBus, this) ;
  }

  set require(req: any) {
    this._require = req;
  }

  get Service() : IService {
    return this._service;
  }
  
  get Module() : IModule {
    return this._module;
  }
}
