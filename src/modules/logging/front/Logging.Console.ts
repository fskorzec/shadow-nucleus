import { IModuleEntryPoint, IApi, BaseComponent, connect } from "../../../Plugin";
import { Logger } from "./Logger";

export default class LogginConsole implements IModuleEntryPoint {
  async entryPoint(api: IApi): Promise<void> {
    const logger = api.Service.activateService<Logger>(Logger);

    await api.Service.registerService(logger.cmpName, logger.cmpId, {
      serviceInstance: logger
    });
  }
}

connect(LogginConsole);