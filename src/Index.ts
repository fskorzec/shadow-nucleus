import { EventBus }          from "./shared/event/EventBus" ;
import { IModuleEntryPoint, BaseComponent } from "./Plugin"                ;
import { IEventBus } from "./core/IEventBus";

const evtBus = new EventBus(".", 3);

let servicesByIds  = {} as { [key: string]: unknown };
let servicesByName = {} as { [key: string]: unknown };

export interface IClass {
  new (): IClass;
}

export interface IClassWithParams {
  new (...args: any[]): IClass;
}

interface IPrivateClass extends IClass {
  _evtBus: IEventBus | undefined;
}

const createService = <T extends BaseComponent>(component: IClass): T => {
  const res = new component();
  (res as unknown as IPrivateClass)._evtBus = evtBus;
  return res as unknown as T;
}

const getService = <T>(serviceName: string, serviceId?:string): T => {
  return void 0 as unknown as T;
}

const exposeService = (serviceName: string, serviceId: string, entity: unknown): void => {
  servicesByIds[serviceId]    = entity;
  servicesByName[serviceName] = entity;
  evtBus.emitAsync("Api.Service.ExposeService", {
    serviceName,
    serviceId,
    entity
  });
}

export function registerComponent(startModule: IModuleEntryPoint): void {
  startModule.entryPoint({
    createService,
    exposeService, 
    getService
  });
}