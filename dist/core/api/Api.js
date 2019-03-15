"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("./service/Service");
const Module_1 = require("./module/Module");
class Api {
    constructor(evtBus) {
        this._evtBus = evtBus;
        this._service = new Service_1.Service(evtBus);
        this._module = new Module_1.Module(evtBus, this);
    }
    set require(req) {
        this._require = req;
    }
    get Service() {
        return this._service;
    }
    get Module() {
        return this._module;
    }
}
exports.Api = Api;
//# sourceMappingURL=Api.js.map