import { Logger } from "./Logger";

import { 
  IModuleEntryPoint, 
  IApi, 
  connect 
} from "../../../Plugin";

export default class LogginConsole implements IModuleEntryPoint {
  async entryPoint(api: IApi): Promise<void> {
    const logger = await api.Service.resolve<Logger>(Logger);

    await api.Service.registerService(logger.cmpName, logger.cmpId, {
      serviceInstance: logger
    });
  }
}

connect(LogginConsole);