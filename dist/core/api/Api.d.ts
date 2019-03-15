import { Service } from "./service/Service";
import { IService } from "./service/IService";
import { IEventBus } from "../IEventBus";
import { IApi } from "./IApi";
import { IModule } from "./module/IModule";
import { Module } from "./module/Module";
export declare class Api implements IApi {
    _evtBus: IEventBus;
    _service: Service;
    _module: Module;
    _require: any;
    constructor(evtBus: IEventBus);
    require: any;
    readonly Service: IService;
    readonly Module: IModule;
}
//# sourceMappingURL=Api.d.ts.map