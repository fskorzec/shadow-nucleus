"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseTerminal_1 = require("./core/BaseTerminal");
const Constant_1 = require("./core/Constant");
const Constant_2 = require("./core/Constant");
class Terminal extends BaseTerminal_1.BaseTerminal {
    constructor() {
        super();
        this.red = void 0;
        this.black = void 0;
        this.green = void 0;
        this.yellow = void 0;
        this.blue = void 0;
        this.magenta = void 0;
        this.cyan = void 0;
        this.lightGray = void 0;
        this.darkGray = void 0;
        this.lightRed = void 0;
        this.lightGreen = void 0;
        this.lightYellow = void 0;
        this.lightBlue = void 0;
        this.lightMagenta = void 0;
        this.lightCyan = void 0;
        this.white = void 0;
        this.bgRed = void 0;
        this.bgBlack = void 0;
        this.bgGreen = void 0;
        this.bgYellow = void 0;
        this.bgBlue = void 0;
        this.bgMagenta = void 0;
        this.bgCyan = void 0;
        this.bgLightGray = void 0;
        this.bgDarkGray = void 0;
        this.bgLightRed = void 0;
        this.bgLightGreen = void 0;
        this.bgLightYellow = void 0;
        this.bgLightBlue = void 0;
        this.bgLightMagenta = void 0;
        this.bgLightCyan = void 0;
        this.bgWhite = void 0;
        /**
         * Mixin for foreground and background colors
         */
        for (let i in Constant_2.Color16) {
            this[i] = function (text = "") {
                return text === "" ? this : this["_color"](Constant_2.ForeColor[Constant_2.Color16[i]])
                    .text(text)["_color"](Constant_2.endingForeColor);
            };
            let j = i[0].toUpperCase() + i.substr(1);
            this[`bg${j}`] = function (text = "") {
                return text === "" ? this : this["_color"](Constant_2.BackColor[Constant_2.Color16[i]])
                    .text(text)["_color"](Constant_2.endingBackColor);
            };
        }
        /**
         * Mixin for styles
         */
        for (let i in Constant_1.Styles) {
            this[i] = function (text = "") {
                return text === "" ? this : this["_color"](Constant_1.Styles[i][0])
                    .text(text)["_color"](Constant_1.Styles[i][1]);
            };
        }
    }
    drawColoredText(text, foreColor, backColor) {
        foreColor && this._color(foreColor);
        backColor && this._color(backColor);
        this.text(text);
        backColor && this._color(Constant_2.endingBackColor);
        foreColor && this._color(Constant_2.endingForeColor);
        return this;
    }
    getAndClearBuffer() {
        const res = this._buffer;
        this.clearBuffer();
        return res;
    }
}
exports.Terminal = Terminal;
//# sourceMappingURL=Terminal.js.map