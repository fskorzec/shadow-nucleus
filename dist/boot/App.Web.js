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
const Nucleus_1 = require("../Nucleus");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataPath = document.currentScript.getAttribute("data-path") || "";
        // Start the core api expose it
        yield Nucleus_1.startNucleus();
        try {
            //Load the nucleus engine
            yield _nucleus_api.Module.loadModule(`${dataPath}/nucleus.web.js`);
        }
        catch ( /** Module does not exists */_a) { /** Module does not exists */ }
        // Check for the module.conf.json file
        try {
            const jsonConf = yield (yield fetch(`${dataPath}/modules.conf.web.json`)).json();
            for (let i = 0; i < jsonConf.modules.length; i++) {
                yield _nucleus_api.Module.loadModule(`${dataPath}/${jsonConf.modules[i].path}`);
            }
        }
        catch (ex) {
            console.log(`modules.conf.web.json file was not found. Nucleus loading aborted.`);
        }
    });
}
exports.start = start;
//# sourceMappingURL=App.Web.js.map