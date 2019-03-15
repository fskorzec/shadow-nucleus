import { IEventBus } from "../../IEventBus";
import { RegisterServiceType } from "./Types";
import { IService } from "./IService";
/**
 * @class Service
 */
export declare class Service implements IService {
    private _evtBus;
    private _serviceMap;
    constructor(evtBus: IEventBus);
    private initEvents;
    private _registerService;
    /**
     * Register a new service
     * @param serviceName The service name
     * @param serviceId The main service Id
     * @param payload The payload
     */
    registerService(serviceName: string, serviceId: string, payload: RegisterServiceType): Promise<void>;
    private _getService;
    /**
     * Gets the service instance or Definition
     * @param serviceName The service name
     * @param serviceId The service Id
     */
    getService<T>(serviceName: string, serviceId: string): Promise<T>;
    /**
     * Activate a service instance from its definition class
     * @param classDefinition The class definition to instanciate
     */
    resolve<T>(classDefinition: {
        new (...params: any[]): any;
    }): Promise<T>;
}
//# sourceMappingURL=Service.d.ts.map