"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nucleus_1 = require("../Nucleus");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        // Start the core api expose it
        yield Nucleus_1.startNucleus(__non_webpack_require__);
        if (fs.existsSync(path.resolve("nucleus.node.js"))) {
            //Load the nucleus engine
            yield _nucleus_api.Module.loadModule(path.resolve("nucleus.node.js"));
        }
        // Check for the module.conf.json file
        if (fs.existsSync(path.resolve("modules.conf.node.json"))) {
            // Loads the configuration file
            const jsonConf = JSON.parse(fs.readFileSync(path.resolve("modules.conf.node.json"), "utf8"));
            // Loads each modules
            for (let i = 0; i < jsonConf.modules.length; i++) {
                yield _nucleus_api.Module.loadModule(path.resolve(jsonConf.modules[i].path));
            }
        }
        else {
            // Abord if no configuration file is found
            console.log(`${path.resolve("modules.conf.node.json")} file was not found. Nucleus loading aborted.`);
        }
    });
}
exports.start = start;
//# sourceMappingURL=App.Node.js.map