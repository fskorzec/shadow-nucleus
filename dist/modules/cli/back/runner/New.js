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
const Guid_1 = require("../../../../shared/text/Guid");
class New {
    static newModule(options) {
        return __awaiter(this, void 0, void 0, function* () {
            options.modulePath = options.modulePath || ".";
            const env = (yield this._SendWithReturn("CLI.ENV.GET_INFO", "CLI.ENV.INFO_GOTTEN", {
                sender: this.identity,
                payload: {
                    guid: Guid_1.Guid.getGuid()
                }
            })).payload;
            console.log(JSON.stringify(env, null, 2));
        });
    }
}
exports.New = New;
//# sourceMappingURL=New.js.map