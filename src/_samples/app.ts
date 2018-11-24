import { EventBus } from "../shared/event/EventBus";
import { Api } from "../core/api/Api";

const evtBus = new EventBus(".", 3);
const api = new Api(evtBus);

evtBus.on("allEvents", (data) => {
  console.log(data);
});

(async() => {
  await api.Service.registerService("service-name", "service-id", {
    serviceDefinition: Date,
  });

  var x = await api.Service.getService("service-name", "service-id");

  console.log("***************x***************", x)
})();