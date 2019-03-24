"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1;
"use strict";
const Plugin_1 = require("../../../Plugin");
const Events_1 = require("../Events");
const Ioc_1 = require("../../../core/util/Ioc");
let Logger = Logger_1 = class Logger extends Plugin_1.BaseComponent {
    constructor() {
        super();
        this.serviceName = "logger";
        this.serviceId = "com.nucleus";
    }
    initialize() {
        if (Logger_1.hasBeenInitialized) {
            return;
        }
        else {
            Logger_1.hasBeenInitialized = true;
        }
        this._Receive(Events_1.Acts.LOGGING.LOGGER.LOG, (data) => {
            console.log(...data.payload);
            this._Send(Events_1.Evts.LOGING.LOGGER.LOGGED, data);
        });
        this._Receive(Events_1.Acts.LOGGING.LOGGER.WARN, (data) => {
            console.warn(...data.payload);
            this._Send(Events_1.Evts.LOGING.LOGGER.WARNED, data);
        });
        this._Receive(Events_1.Acts.LOGGING.LOGGER.INFO, (data) => {
            console.info(...data.payload);
            this._Send(Events_1.Evts.LOGING.LOGGER.INFORMED, data);
        });
    }
    log(...args) {
        this._Send(Events_1.Acts.LOGGING.LOGGER.LOG, {
            sender: this.identity,
            payload: args
        });
    }
    warn(...args) {
        this._Send(Events_1.Acts.LOGGING.LOGGER.WARN, {
            sender: this.identity,
            payload: args
        });
    }
    info(...args) {
        this._Send(Events_1.Acts.LOGGING.LOGGER.INFO, {
            sender: this.identity,
            payload: args
        });
    }
};
Logger.hasBeenInitialized = false;
Logger = Logger_1 = __decorate([
    Ioc_1.IocInject("ILogger")
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map