"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Webpack_1;
"use strict";
const Plugin_1 = require("../../../Plugin");
const webpack_1 = __importDefault(require("webpack"));
const Events_1 = require("./Events");
const Ioc_1 = require("../../../core/util/Ioc");
let Webpack = Webpack_1 = class Webpack extends Plugin_1.BaseComponent {
    constructor() {
        super();
        this.serviceName = "webpack";
        this.serviceId = "com.nucleus";
    }
    initialize() {
        if (Webpack_1.hasBeenInitialized) {
            return;
        }
        else {
            Webpack_1.hasBeenInitialized = true;
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
};
Webpack.hasBeenInitialized = false;
Webpack = Webpack_1 = __decorate([
    Ioc_1.IocInject("IWebpack")
], Webpack);
exports.Webpack = Webpack;
//# sourceMappingURL=Webpack.js.map