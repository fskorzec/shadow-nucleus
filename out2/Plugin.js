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
const BaseComponent_1 = require("./core/BaseComponent");
exports.BaseComponent = BaseComponent_1.BaseComponent;
const UtilEnv = __importStar(require("./core/util/Env"));
exports.UtilEnv = UtilEnv;
const UtilConstant = __importStar(require("./core/util/Constant"));
exports.UtilConstant = UtilConstant;
const Ioc_1 = require("./core/util/Ioc");
exports.IocInject = Ioc_1.IocInject;
exports.IocResolve = Ioc_1.IocResolve;
function connect(module) {
    return __awaiter(this, void 0, void 0, function* () {
        yield _nucleus(module);
    });
}
exports.connect = connect;
