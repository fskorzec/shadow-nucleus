import { IEventBus }  from "../../IEventBus" ;
import { Acts, Evts } from "./Events"        ;

import { 
  RegisterServiceDataType , 
  RegisterStatusType      , 
  RegisterServiceType, 
  ServiceIdentifierType
} from "./Types";
import { BaseComponent } from "../../BaseComponent";
import { IClass, IPrivateClass } from "./Interfaces";

/**
 * @class Service
 */
export class Service {
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
    if (!this._serviceMap[`${payload.serviceId}.${payload.serviceName}`]) {
      this._evtBus.emitAsync(Evts.API.SERVICE.SERVICE_RETURNED, {
        ...payload, 
        success : false ,
        reason  : Error(`The service ${payload.serviceId}.${payload.serviceName} was not found`)
      } as RegisterServiceDataType & RegisterStatusType)
    } else {
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

  activateService<T extends BaseComponent>(classDefinition: IClass): T {
    const res = new classDefinition();
    (res as unknown as IPrivateClass)._evtBus = this._evtBus;
    return res as unknown as T;
  }
}