import { IModuleEntryPoint } from "../../Plugin";
import { BaseComponent } from "../../core/BaseComponent";
import { IClass } from "../../Index";

class Logger extends BaseComponent {
  cmpId : string = ""
  cmpName: string = "com.nucleus.logging.logger";

  private _target: string = "console";

  constructor(...args: any[]) {
    super();
  }

  private initialize() {
  }

}

export default {
  entryPoint: (
  api : {
    createService   : <T extends BaseComponent>(component: any, ...argArray: any[])             => T    ;
    getService      : <T>(serviceName: string, serviceId?:string)               => T    ;
    exposeService   : (serviceName: string, serviceId: string, entity: unknown) => void ;
  }
  ): void => {
    const logger = api.createService<Logger>(Logger);
    logger["initialize"]();
    api.exposeService(logger.cmpName, logger.cmpId, logger);
    api.getService<Logger>("")
  }
} as IModuleEntryPoint;