import { EventBus } from "../shared/event/EventBus";
import { Api } from "../core/api/Api";
import LogginConsole from "../modules/logging/front/Logging.Console";
import { ILogger } from "../modules/logging/front/Logger";

const evtBus = new EventBus(".", 3);
const api = new Api(evtBus);

/*evtBus.on("allEvents", (data) => {
  console.log("*************************************************************************************");
  console.log(data);
});*/

declare var process: any;

(async() => {
  await new LogginConsole().entryPoint(api);

  const logger = await api.Service.getService<ILogger>("logging.front.logger", "com.shadow-nuclues.core")
  logger.log("Hello", "Kitty");
  logger.warn();
})();