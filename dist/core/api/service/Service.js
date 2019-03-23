"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("./Events");
/**
 * @class Service
 */
class Service {
    constructor(evtBus) {
        this._evtBus = evtBus;
        this._serviceMap = {};
        this.initEvents();
    }
    initEvents() {
        this._evtBus.on(Events_1.Acts.API.SERVICE.REGISTER_SERVICE, (payload) => {
            this._registerService(payload);
        });
        this._evtBus.on(Events_1.Acts.API.SERVICE.GET_SERVICE, (payload) => {
            this._getService(payload);
        });
    }
    //#region Register Service 
    _registerService(payload) {
        if (this._serviceMap[`${payload.serviceId}.${payload.serviceName}`]) {
            this._evtBus.emitAsync(Events_1.Evts.API.SERVICE.SERVICE_REGISTERED, Object.assign({}, payload, { success: false, reason: Error(`The service ${payload.serviceId}.${payload.serviceName} is already registered`) }));
        }
        else {
            this._serviceMap[`${payload.serviceId}.${payload.serviceName}`] = payload;
            this._evtBus.emitAsync(Events_1.Evts.API.SERVICE.SERVICE_REGISTERED, Object.assign({}, payload, { success: true }));
            this._getService({
                serviceId: payload.serviceId,
                serviceName: payload.serviceName
            });
        }
    }
    /**
     * Register a new service
     * @param serviceName The service name
     * @param serviceId The main service Id
     * @param payload The payload
     */
    registerService(serviceName, serviceId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((r, x) => {
                const evt = this._evtBus.on(Events_1.Evts.API.SERVICE.SERVICE_REGISTERED, (data) => {
                    if (data.serviceName === serviceName && data.serviceId === serviceId) {
                        evt.off();
                        if (data.success) {
                            r();
                        }
                        else {
                            x(data.reason);
                        }
                    }
                });
                this._evtBus.emitAsync(Events_1.Acts.API.SERVICE.REGISTER_SERVICE, {
                    serviceName,
                    serviceId,
                    payload
                });
            });
        });
    }
    //#endregion
    //#region Get Service 
    _getService(payload) {
        if (this._serviceMap[`${payload.serviceId}.${payload.serviceName}`]) {
            this._evtBus.emitAsync(Events_1.Evts.API.SERVICE.SERVICE_RETURNED, Object.assign({}, this._serviceMap[`${payload.serviceId}.${payload.serviceName}`], { success: true }));
        }
    }
    /**
     * Gets the service instance or Definition
     * @param serviceName The service name
     * @param serviceId The service Id
     */
    getService(serviceName, serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((r, x) => {
                const evt = this._evtBus.on(Events_1.Evts.API.SERVICE.SERVICE_RETURNED, (data) => {
                    if (data.serviceName === serviceName && data.serviceId === serviceId) {
                        evt.off();
                        if (data.success) {
                            r(data.payload.serviceDefinition
                                ?
                                    data.payload.serviceDefinition
                                :
                                    data.payload.serviceInstance);
                        }
                        else {
                            x(data.reason);
                        }
                    }
                });
                this._evtBus.emitAsync(Events_1.Acts.API.SERVICE.GET_SERVICE, {
                    serviceName,
                    serviceId
                });
            });
        });
    }
    //#endregion
    /**
     * Activate a service instance from its definition class
     * @param classDefinition The class definition to instanciate
     */
    resolve(classDefinition) {
        return __awaiter(this, void 0, void 0, function* () {
            let services = [];
            if ("__nc__Services" in classDefinition.prototype) {
                for (let def of classDefinition.prototype.__nc__Services) {
                    const service = yield this.getService(...def);
                    services.push(service);
                }
            }
            const res = new classDefinition(...services);
            if (res["_NC_TYPE_"]) {
                res._EvtBus = this._evtBus;
                res.getService = (serviceName, serviceId) => __awaiter(this, void 0, void 0, function* () { return yield this.getService(serviceName, serviceId); });
                res.initialize();
            }
            return res;
        });
    }
}
exports.Service = Service;
//# sourceMappingURL=Service.js.map