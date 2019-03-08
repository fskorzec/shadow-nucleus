"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("./constant/Error");
class BaseComponent {
    constructor() {
        this._NC_TYPE_ = "BaseComponent";
        this.cmpId = "";
        this.cmpName = "";
        this.getService = void 0;
    }
    /**
     * Send a new command
     * @param eventName Full name of the event
     * @param query The query description
     */
    _send(eventName, query) {
        if (this._evtBus) {
            this._evtBus.emitAsync(eventName, query);
        }
    }
    /**
     * Send a new command and process the result
     * @param eventName Full name of the event
     * @param returnEventName Full name of the event to listen in return
     * @param query The query description
     */
    _sendWithReturn(eventName, returnEventName, query) {
        return new Promise((resolve, reject) => {
            if (this._evtBus) {
                this._evtBus.once(returnEventName, (data) => {
                    resolve(data);
                });
                this._evtBus.emitAsync(eventName, query);
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
        if (this._evtBus) {
            return this._evtBus.on(eventName, handler);
        }
        return { off: () => void 0 };
    }
    /**
     * Listen once to a specific event
     * @param eventName Full name of the event
     * @param handler  The handler function to use process the data
     */
    _ReceiveOnce(eventName, handler) {
        if (this._evtBus) {
            return this._evtBus.once(eventName, handler);
        }
        return { off: () => void 0 };
    }
    get identity() {
        return {
            cmpId: this.cmpId,
            cmpName: this.cmpName
        };
    }
    initialize() {
    }
}
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=BaseComponent.js.map