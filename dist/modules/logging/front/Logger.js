"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Plugin_1 = require("../../../Plugin");
const Events_1 = require("../Events");
class Logger extends Plugin_1.BaseComponent {
    constructor() {
        super();
        this.cmpName = "logging.front.logger";
        this.cmpId = "com.shadow-nuclues.core";
    }
    initialize() {
        if (Logger.hasBeenInitialized) {
            return;
        }
        else {
            Logger.hasBeenInitialized = true;
        }
        this._Receive(Events_1.Acts.LOGGING.LOGGER.LOG, (data) => {
            console.log(...data.payload);
            this._send(Events_1.Evts.LOGING.LOGGER.LOGGED, data);
        });
        this._Receive(Events_1.Acts.LOGGING.LOGGER.WARN, (data) => {
            console.warn(...data.payload);
            this._send(Events_1.Evts.LOGING.LOGGER.WARNED, data);
        });
        this._Receive(Events_1.Acts.LOGGING.LOGGER.INFO, (data) => {
            console.info(...data.payload);
            this._send(Events_1.Evts.LOGING.LOGGER.INFORMED, data);
        });
    }
    log(...args) {
        this._send(Events_1.Acts.LOGGING.LOGGER.LOG, {
            sender: this.identity,
            payload: args
        });
    }
    warn(...args) {
        this._send(Events_1.Acts.LOGGING.LOGGER.WARN, {
            sender: this.identity,
            payload: args
        });
    }
    info(...args) {
        this._send(Events_1.Acts.LOGGING.LOGGER.INFO, {
            sender: this.identity,
            payload: args
        });
    }
}
Logger.hasBeenInitialized = false;
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map