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
const Logger_1 = require("./Logger");
const Plugin_1 = require("../../../Plugin");
class LogginConsole {
    entryPoint(api) {
        return __awaiter(this, void 0, void 0, function* () {
            const logger = yield api.Service.resolve(Logger_1.Logger);
            yield api.Service.registerService(logger.cmpName, logger.cmpId, {
                serviceInstance: logger
            });
        });
    }
}
exports.default = LogginConsole;
Plugin_1.connect(LogginConsole);
//# sourceMappingURL=LoggingConsole.js.map