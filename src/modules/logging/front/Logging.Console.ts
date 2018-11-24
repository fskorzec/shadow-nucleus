import { IModuleEntryPoint, IApi, BaseComponent } from "../../../Plugin";
import { Logger } from "./Logger";

export class LogginConsole implements IModuleEntryPoint {
  async entryPoint(api: IApi): Promise<void> {
    const logger = api.Service.activateService<Logger>(Logger);

    
    await api.Service.registerService(logger.cmpName, logger.cmpId, {
      serviceInstance: logger
    });
  }
}
