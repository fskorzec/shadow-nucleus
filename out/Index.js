"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventBus_1 = require("./shared/event/EventBus");
const evtBus = new EventBus_1.EventBus(".", 3);
let servicesByIds = {};
let servicesByName = {};
const createService = (component) => {
    const res = new component();
    res._evtBus = evtBus;
    return res;
};
const getService = (serviceName, serviceId) => {
    return void 0;
};
const exposeService = (serviceName, serviceId, entity) => {
    servicesByIds[serviceId] = entity;
    servicesByName[serviceName] = entity;
    evtBus.emitAsync("Api.Service.ExposeService", {
        serviceName,
        serviceId,
        entity
    });
};
function registerComponent(startModule) {
    startModule.entryPoint({
        createService,
        exposeService,
        getService
    });
}
exports.registerComponent = registerComponent;
