"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Plugin_1 = require("../../../Plugin");
const webpack_1 = __importDefault(require("webpack"));
class Webpack extends Plugin_1.BaseComponent {
    constructor() {
        super();
        this.cmpName = "webpack";
        this.cmpId = "com.nucleus";
    }
    initialize() {
        if (Webpack.hasBeenInitialized) {
            return;
        }
        else {
            Webpack.hasBeenInitialized = true;
        }
    }
    webpack() {
        webpack_1.default({
            entry: [""],
            output: {
                path: "",
                filename: ""
            }
        }, (err, stats) => {
        });
    }
}
Webpack.hasBeenInitialized = false;
exports.Webpack = Webpack;
//# sourceMappingURL=Webpack.js.map