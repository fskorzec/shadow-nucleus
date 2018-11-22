"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseComponent_1 = require("../../core/BaseComponent");
class Logger extends BaseComponent_1.BaseComponent {
    constructor(...args) {
        super();
        this.cmpId = "";
        this.cmpName = "com.nucleus.logging.logger";
        this._target = "console";
    }
    initialize() {
    }
}
exports.default = {
    entryPoint: (api) => {
        const logger = api.createService(Logger);
        logger["initialize"]();
        api.exposeService(logger.cmpName, logger.cmpId, logger);
        api.getService("");
    }
};
