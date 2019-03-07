import { IEventBus }     from "../../IEventBus" ;
import { Acts, Evts }    from "./Events"        ;
import { IPrivateClass } from "./Interfaces"    ;

import { 
  RegisterServiceDataType , 
  RegisterStatusType      , 
  RegisterServiceType     , 
  ServiceIdentifierType
} from "./Types";
import { IService } from "./IService";

/**
 * @class Service
 */
export class Service implements IService {
  private _evtBus     : IEventBus                  ;
  private _serviceMap : { [key: string]: unknown } ;

  constructor(evtBus: IEventBus) {
    this._evtBus     = evtBus ;
    this._serviceMap = {}     ;

    this.initEvents();
  }

  private initEvents(): void {
    this._evtBus.on(Acts.API.SERVICE.REGISTER_SERVICE, (payload) => {
      this._registerService(payload);
    });

    this._evtBus.on(Acts.API.SERVICE.GET_SERVICE, (payload) => {
      this._getService(payload);
    });
  }

  //#region Register Service 
  private _registerService(payload: RegisterServiceDataType) {
    if (this._serviceMap[`${payload.serviceId}.${payload.serviceName}`]) {
      this._evtBus.emitAsync(Evts.API.SERVICE.SERVICE_REGISTERED, {
        ...payload      , 
        success : false ,
        reason  : Error(`The service ${payload.serviceId}.${payload.serviceName} is already registered`)
      } as RegisterServiceDataType & RegisterStatusType)
    } else {
      this._serviceMap[`${payload.serviceId}.${payload.serviceName}`] = payload;

      this._evtBus.emitAsync(Evts.API.SERVICE.SERVICE_REGISTERED, {
        ...payload, 
        success : true
      });

      this._getService({
        serviceId   : payload.serviceId,
        serviceName : payload.serviceName
      });
    }
  }

  /**
   * Register a new service
   * @param serviceName The service name
   * @param serviceId The main service Id
   * @param payload The payload
   */
  public async registerService(
    serviceName : string , 
    serviceId   : string , 
    payload     : RegisterServiceType
  ): Promise<void> {
    return new Promise<void>( (r,x) => {
      const evt = this._evtBus.on(Evts.API.SERVICE.SERVICE_REGISTERED, (data: RegisterServiceDataType & RegisterStatusType) => {
        if (data.serviceName === serviceName && data.serviceId === serviceId) {
          evt.off();
          if (data.success) {
            r();
          } else {
            x(data.reason);
          }
        }
      });
      
      this._evtBus.emitAsync(Acts.API.SERVICE.REGISTER_SERVICE, {
        serviceName ,
        serviceId   ,
        payload
      });
    });
  }
  //#endregion

  //#region Get Service 
  private _getService(payload: ServiceIdentifierType) {
    if (this._serviceMap[`${payload.serviceId}.${payload.serviceName}`]) {
      this._evtBus.emitAsync(Evts.API.SERVICE.SERVICE_RETURNED, {
        ...this._serviceMap[`${payload.serviceId}.${payload.serviceName}`] , 
        success : true 
      } as RegisterServiceDataType & RegisterStatusType);
    }
  }

  /**
   * Gets the service instance or Definition
   * @param serviceName The service name
   * @param serviceId The service Id
   */
  public async getService<T>(serviceName: string, serviceId: string): Promise<T> {
    return new Promise<T>( (r,x) => {
      const evt = this._evtBus.on(Evts.API.SERVICE.SERVICE_RETURNED, (data: RegisterServiceDataType & RegisterStatusType) => {
        if (data.serviceName === serviceName && data.serviceId === serviceId) {
          evt.off();
          if (data.success) {
            r(
              data.payload.serviceDefinition 
              ? 
              data.payload.serviceDefinition
              :
              data.payload.serviceInstance
            );
          } else {
            x(data.reason);
          }
        }
      });

      this._evtBus.emitAsync(Acts.API.SERVICE.GET_SERVICE, {
        serviceName,
        serviceId
      } as RegisterServiceType);
    });
  }
  //#endregion

  /**
   * Activate a service instance from its definition class
   * @param classDefinition The class definition to instanciate
   */
  async activateService<T>(classDefinition: { new(...params: any[]): any }): Promise<T> {
    let services = {} as {[key: string]: any};

    if ("__nc__Services" in classDefinition.prototype) {
      for(let i in classDefinition.prototype.__nc__Services) {
        const service = await this.getService(...classDefinition.prototype.__nc__Services[i] as [string, string]);
        services[i] = service;
      }
    }
    
    const res = new classDefinition(services) as unknown as IPrivateClass;
    if (res.initialize) {
      res._evtBus = this._evtBus;
      res.getService = async (serviceName: string, serviceId: string) => await this.getService(serviceName, serviceId);
      res.initialize();
    }

    return res as unknown as T;
  }
}
