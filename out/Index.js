"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventBus_1 = require("./shared/event/EventBus");
const Env_1 = require("./core/util/Env");
const Api_1 = require("./core/api/Api");
const evtBus = new EventBus_1.EventBus(".", 3);
const api = new Api_1.Api(evtBus);
evtBus.on("allEvents", (data) => {
    console.log("*************************************************************************************");
    console.log(data);
});
if (!Env_1.isNode()) {
    window["_nucleus_api"] = api;
    window["_nucleus"] = (module) => {
        const mod = module;
        new mod().entryPoint(api);
        evtBus.emit("API.MODULE.MODULE_LOADED", { mod });
    };
}
else {
    global["_nucleus_api"] = api;
    global["_nucleus"] = (module) => {
        const mod = module;
        new mod().entryPoint(api);
        evtBus.emit("API.MODULE.MODULE_LOADED", { mod });
    };
}
