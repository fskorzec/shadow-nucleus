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
/**
 * The MIT License (MIT)
 * Copyright (c) <2016> <Beewix Interactive>
 * Author <François Skorzec>xxww
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const Constant_1 = require("./Constant");
const TerminalStreamWriter_1 = require("../TerminalStreamWriter");
const events_1 = require("events");
/**
 * Defines a base class for terminal shell
 * @class BaseTerminal
 * @abstract
 */
class BaseTerminal extends events_1.EventEmitter {
    constructor() {
        super();
        this._x = 0;
        this._y = 0;
        this._buffer = "";
        process.stdin.setEncoding("utf8");
        this._streamWriterDataEventHandler = void 0;
        this.on("write", (data) => {
            if (this._streamWriterDataEventHandler) {
                this._streamWriterDataEventHandler(data);
            }
        });
    }
    _color(colorValue) {
        this._buffer += `${Constant_1.EscOpeningChar}${colorValue}${Constant_1.EscColorClosingChar}`;
        return this;
    }
    _colorExt(colorValue) {
        this._buffer += `${Constant_1.EscOpeningChar}38;5;${colorValue}${Constant_1.EscColorClosingChar}`;
        return this;
    }
    _bgColorExt(colorValue) {
        this._buffer += `${Constant_1.EscOpeningChar}48;5;${colorValue}${Constant_1.EscColorClosingChar}`;
        return this;
    }
    /**
     *
     */
    set onWrite(value) {
        this._streamWriterDataEventHandler = value;
    }
    get onWrite() {
        return this._streamWriterDataEventHandler;
    }
    /**
     * Resets all color settings
     * @method reset
     */
    reset() {
        return this._color(0)._color(0);
    }
    clearTerminal() {
        process.stdout.write(`${Constant_1.EscOpeningChar}2J`);
        return this;
    }
    getNextinputChoice(choices) {
        return __awaiter(this, void 0, void 0, function* () {
            this.listenInputs(true);
            return new Promise((r, x) => {
                process.stdin.on('keypress', (str, key) => {
                    console.log(str, key);
                });
                this.onWrite = (data) => {
                    console.log(data, data.length, data[0].length);
                    data.forEach(strData => {
                        switch (strData.charCodeAt(0)) {
                            case 13:
                                this.stopListen();
                                this.newLine().write();
                                r(0);
                                break;
                            default:
                                this.write(strData.charCodeAt(0)).write(" ");
                                break;
                        }
                    });
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
    /**
     * Draws a line onto the terminal
     * @method drawLine
     * @param {string} char
     */
    drawLine(char = "") {
        if (char === "") {
            char = " ";
        }
        if (typeof char === "string" && char.length > 1) {
            char = char.charAt(0);
        }
        let line = "";
        for (let i = 0; i < this.cols - 1; i++) {
            line += char;
        }
        //let old = this._buffer;
        this.text(line);
        //this._buffer = old;
        return this;
    }
    to(row, col) {
        this._buffer += `${Constant_1.EscOpeningChar}${row};${col}${Constant_1.EscPositionClosingChar}`;
        return this;
    }
    toptBy(by) {
        this._buffer += `${"\x1B["}${by}${"A"}`;
        return this;
    }
    bottomBy(by) {
        this._buffer += `${"\x1B["}${by}${"B"}`;
        return this;
    }
    rightBy(by) {
        this._buffer += `${"\x1B["}${by}${"C"}`;
        return this;
    }
    leftBy(by) {
        this._buffer += `${"\x1B["}${by}${"D"}`;
        return this;
    }
    saveCursorPosition() {
        this._buffer += `${"\x1B["}${"s"}`;
        return this;
    }
    restoreCursorPosition() {
        this._buffer += `${"\x1B["}${"u"}`;
        return this;
    }
    clearLine() {
        this._buffer += `${"\x1B["}${"k"}`;
        return this;
    }
    row(row) {
        this._buffer += `${Constant_1.EscOpeningChar}${row}${Constant_1.EscPositionClosingChar}`;
        return this;
    }
    col(col) {
        this._buffer += `${Constant_1.EscOpeningChar};${col}${Constant_1.EscPositionClosingChar}`;
        return this;
    }
    ext(colorValue) {
        return this._colorExt(colorValue);
    }
    bgExt(colorValue) {
        return this._bgColorExt(colorValue);
    }
    text(object) {
        if (!object) {
            return this;
        }
        this._buffer += object.toString();
        return this;
    }
    newLine() {
        this._buffer += "\n";
        return this;
    }
    stringify(object) {
        this._buffer += JSON.stringify(object, null, 2);
        return this;
    }
    clear() {
        console.clear();
    }
    clearBuffer() {
        this._buffer = "";
    }
    write(object) {
        if (object !== void 0) {
            this.text(object);
        }
        process.stdout.write(this._buffer);
        this._buffer = "";
        return this;
    }
    get rows() {
        return process.stdout["rows"] || 0;
    }
    get cols() {
        return process.stdout["columns"] || 0;
    }
    /**
     * Stops listening to inputs
     * This will unpipe the current stream and unregister all callbacks
     * @method stopListen
     * @return {void}
     */
    stopListen() {
        if (process.stdin["setRawMode"] !== undefined) {
            process.stdin["setRawMode"](false);
        }
        process.stdin.removeAllListeners();
        process.stdin.unpipe(this._WritableStream);
    }
    /**
     * Listen to inputs
     * By default it will start listening to inputs and let you get inputs by registering on write event.
     * You can set your own StreamWriter. In that case, the write event will not be fired
     * @method listenInputs
     * @param {boolean} rawMode If true the Terminal will listen Key data, otherwise string data
     */
    listenInputs(rawMode = false, streamWriter) {
        this._WritableStream = streamWriter ? streamWriter : new TerminalStreamWriter_1.TerminalStreamWriter(this);
        this._WritableStream.on("write", (data) => {
            this.emit("write", data);
        });
        this._WritableStream.on("pipe", (src) => {
            this._WritableStream.src = src;
            src["setRawMode"](rawMode);
        });
        process.stdin.pipe(this._WritableStream);
        process.stdin.setRawMode && process.stdin.setRawMode(rawMode);
    }
}
exports.BaseTerminal = BaseTerminal;
