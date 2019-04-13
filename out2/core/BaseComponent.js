"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("./constant/Error");
class BaseComponent {
    constructor() {
        this._NC_TYPE_ = "BaseComponent";
        this.serviceId = "";
        this.serviceName = "";
        this.getService = void 0;
    }
    /**
     * Send a new command
     * @param eventName Full name of the event
     * @param query The query description
     */
    _Send(eventName, query) {
        if (this._EvtBus) {
            this._EvtBus.emitAsync(eventName, query);
        }
    }
    _SendSync(eventName, query) {
        if (this._EvtBus) {
            this._EvtBus.emit(eventName, query);
        }
    }
    /**
     * Send a new command and process the result
     *
     * @param eventName Full name of the event
     * @param returnEventName Full name of the event to listen in return
     * @param query The query description
     */
    _SendWithReturn(eventName, returnEventName, query) {
        return new Promise((resolve, reject) => {
            if (query.payload.guid === null || query.payload.guid === void 0) {
                reject(Error(Error_1.Errors.TECHNICAL.GUID_IS_MISSING));
            }
            if (this._EvtBus) {
                const offEvent = this._EvtBus.on(returnEventName, (data) => {
                    if (data.payload.guid === query.payload.guid) {
                        offEvent.off();
                        resolve(data);
                    }
                });
                this._EvtBus.emitAsync(eventName, query);
            }
            else {
                reject(Error(Error_1.Errors.TECHNICAL.EVENTBUS_IS_NOT_DEFINED));
            }
        });
    }
    /**
     * Start listening to a specific event
     * @param eventName Full name of the event
     * @param handler The handler function to use process the data
     */
    _Receive(eventName, handler) {
        if (this._EvtBus) {
            return this._EvtBus.on(eventName, handler);
        }
        return { off: () => void 0 };
    }
    /**
     * Listen once to a specific event
     * @param eventName Full name of the event
     * @param handler  The handler function to use process the data
     */
    _ReceiveOnce(eventName, handler) {
        if (this._EvtBus) {
            return this._EvtBus.once(eventName, handler);
        }
        return { off: () => void 0 };
    }
    get identity() {
        return {
            serviceId: this.serviceId,
            serviceName: this.serviceName
        };
    }
    initialize() {
    }
}
exports.BaseComponent = BaseComponent;
