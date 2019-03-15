import { IEventBus } from "../../IEventBus";
import { IModule } from "./IModule";
import { IApi } from "../../../Plugin";
export declare class Module implements IModule {
    private _evtBus;
    private _moduleMap;
    private _api;
    constructor(evtBus: IEventBus, api: IApi);
    loadModule(path: string): Promise<void>;
}
//# sourceMappingURL=Module.d.ts.map