"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Plugin_1 = require("../../../Plugin");
const webpack_1 = __importDefault(require("webpack"));
const Events_1 = require("./Events");
class Webpack extends Plugin_1.BaseComponent {
    constructor() {
        super();
        this.serviceName = "webpack";
        this.serviceId = "com.nucleus";
    }
    initialize() {
        if (Webpack.hasBeenInitialized) {
            return;
        }
        else {
            Webpack.hasBeenInitialized = true;
            this._Receive(Events_1.Evts.WEBPACK.PACKAGING.PACK, (data) => {
                const res = webpack_1.default({
                    entry: [data.payload.entry],
                    output: {
                        path: data.payload.outPath,
                        filename: data.payload.outFile
                    }
                }, (err, stats) => {
                    if (err) {
                        this._SendSync(Events_1.Evts.WEBPACK.PACKAGING.FAILED, {
                            sender: this.identity,
                            payload: {
                                error: err,
                                guid: data.payload.guid,
                                stats
                            }
                        });
                    }
                    else {
                        this._SendSync(Events_1.Evts.WEBPACK.PACKAGING.PACKED, {
                            sender: this.identity,
                            payload: {
                                guid: data.payload.guid
                            }
                        });
                    }
                });
            });
        }
    }
}
Webpack.hasBeenInitialized = false;
exports.Webpack = Webpack;
//# sourceMappingURL=Webpack.js.map