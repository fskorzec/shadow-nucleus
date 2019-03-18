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
const Env_1 = require("../../util/Env");
const Events_1 = require("./Events");
class Module {
    constructor(evtBus, api) {
        this._evtBus = evtBus;
        this._moduleMap = {};
        this._api = api;
    }
    loadModule(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((r, x) => {
                this._evtBus.once(Events_1.Evts.API.MODULE.MODULE_LOADED, () => {
                    r();
                });
                if (Env_1.isNode()) {
                    this._evtBus.emit(Events_1.Acts.API.MODULE.LOAD_MODULE, { path });
                    this._api["_require"](path);
                }
                else {
                    this._evtBus.emit(Events_1.Acts.API.MODULE.LOAD_MODULE, { path });
                    const scriptTag = document.createElement("script");
                    scriptTag.type = "text/javascript";
                    scriptTag.src = path;
                    window.document.body.appendChild(scriptTag);
                }
            });
        });
    }
}
exports.Module = Module;
//# sourceMappingURL=Module.js.map