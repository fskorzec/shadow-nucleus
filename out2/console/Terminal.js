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
    drawColoredText(text, foreColor, backColor, style) {
        foreColor && this._color(foreColor);
        backColor && this._color(backColor);
        style && this._color(Constant_1.Styles[style][0]);
        this.text(text);
        style && this._color(Constant_1.Styles[style][1]);
        backColor && this._color(Constant_2.endingBackColor);
        foreColor && this._color(Constant_2.endingForeColor);
        return this;
    }
    getAndClearBuffer() {
        const res = this._buffer;
        this.clearBuffer();
        return res;
    }
    getNextinputChoice(choices) {
        return __awaiter(this, void 0, void 0, function* () {
            this.listenInputs(true);
            return new Promise((r, x) => {
                this.newLine();
                this.write();
                this.saveCursorPosition().write();
                let idx = 0;
                choices.forEach((choice, index) => {
                    if (index === idx) {
                        this.green(`[${index + 1}] ${choice}`).newLine().write();
                    }
                    else {
                        this.white(` ${index + 1}  ${choice}`).newLine().write();
                    }
                });
                this.onWrite = (data) => {
                    //console.log(data, data.length, data[0].length)
                    data.forEach(strData => {
                        switch (strData.charCodeAt(0)) {
                            case 13:
                                this.stopListen();
                                this.newLine().write();
                                r(idx);
                                break;
                            default:
                                //this.write(strData.charCodeAt(0)).write(" ");
                                break;
                        }
                    });
                    const UP = "\u001b[A";
                    const DN = "\u001b[B";
                    const RT = "\u001b[D";
                    const LT = "\u001b[C";
                    const str = data[0];
                    if (str === UP || str === DN || str === LT || str === RT) {
                        switch (str) {
                            case UP:
                                idx--;
                                break;
                            case DN:
                                idx++;
                                break;
                        }
                        idx < 0 ? (idx = 0) : void 0;
                        idx >= choices.length ? (idx = choices.length - 1) : void 0;
                        //this.restoreCursorPosition().write();
                        this.topBy(choices.length).write();
                        choices.forEach((choice, index) => {
                            if (index === idx) {
                                this.green(`[${index + 1}] ${choice}`).newLine().write();
                            }
                            else {
                                this.white(` ${index + 1}  ${choice}`).newLine().write();
                            }
                        });
                    }
                };
            });
        });
    }
    getNextInput(text, isPassword = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (text)
                this.write(text);
            return new Promise((r, x) => {
                try {
                    let res = "";
                    this.onWrite = (data) => {
                        const strData = data.join();
                        res += strData;
                        this.write(isPassword ? "*" : strData);
                        if (strData.charCodeAt(0) === 13) {
                            this.stopListen();
                            this.newLine().write();
                            r(res);
                        }
                    };
                    this.listenInputs(true);
                }
                catch (ex) {
                    x(ex);
                }
            });
        });
    }
}
exports.Terminal = Terminal;
