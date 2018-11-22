import { IClass } from "../Index";
import { BaseComponent } from "../Plugin";

export interface IModuleEntryPoint {
  entryPoint(
    api : {
      createService   : <T extends BaseComponent>(component: IClass) => T;
      getService      : <T>(serviceName: string, serviceId?:string)               => T    ;
      exposeService   : (serviceName: string, serviceId: string, entity: unknown) => void ;
    }
  ): void;
}