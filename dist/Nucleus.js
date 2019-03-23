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
const EventBus_1 = require("./shared/event/EventBus");
const Env_1 = require("./core/util/Env");
const Api_1 = require("./core/api/Api");
function startNucleus(parentRequire) {
    return __awaiter(this, void 0, void 0, function* () {
        const evtBus = new EventBus_1.EventBus(".", 3);
        const api = new Api_1.Api(evtBus);
        api.require = parentRequire;
        let globalSystem = null;
        if (!Env_1.isNode()) {
            globalSystem = window;
        }
        else {
            globalSystem = global;
        }
        globalSystem["_nucleus_api"] = api;
        globalSystem["_nucleus"] = (module) => __awaiter(this, void 0, void 0, function* () {
            const mod = module;
            yield new mod().entryPoint(api);
            evtBus.emit("API.MODULE.MODULE_LOADED", { mod });
        });
        return;
    });
}
exports.startNucleus = startNucleus;
//# sourceMappingURL=Nucleus.js.map