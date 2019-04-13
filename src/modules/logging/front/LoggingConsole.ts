import { Logger, ILogger } from "./Logger";

import { 
  IModuleEntryPoint, 
  IApi, 
  connect 
} from "../../../Plugin";
import { IocResolve } from "../../../core/util/Ioc";

export default class LogginConsole implements IModuleEntryPoint {

  @IocResolve("ILogger")
  private logger!: ILogger;

  async entryPoint(api: IApi): Promise<void> {
    //const logger = await api.Service.resolve<Logger>(Logger);

    await api.Service.registerService(this.logger.identity, {
      serviceInstance: this.logger
    });
  }
}

connect(LogginConsole);