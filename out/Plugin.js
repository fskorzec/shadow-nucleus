"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseComponent_1 = require("./core/BaseComponent");
exports.BaseComponent = BaseComponent_1.BaseComponent;
const UtilEnv = __importStar(require("./core/util/Env"));
exports.UtilEnv = UtilEnv;
const UtilConstant = __importStar(require("./core/util/Constant"));
exports.UtilConstant = UtilConstant;
;
function connect(module) {
    _nucleus(module);
}
exports.connect = connect;
//# sourceMappingURL=Plugin.js.map