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
import { EscColorClosingChar, EscOpeningChar, EscPositionClosingChar} from "./Constant"              ;
import { TerminalStreamWriter}                                        from "../TerminalStreamWriter" ;
import { EventEmitter}                                                from "events"                  ;

/**
 * Defines a compatible type with a toString function
 */
export type toStringType = { toString: () => string };

/**
 * Defines a base class for terminal shell
 * @class BaseTerminal
 * @abstract
 */
export abstract class BaseTerminal extends EventEmitter {
  protected _x: number = 0;
  protected _y: number = 0;
  protected _streamWriterDataEventHandler: (data: Array<string>) => void;
  protected _WritableStream!:  NodeJS.WritableStream & { src: BaseTerminal } | TerminalStreamWriter<this>;

  protected _buffer: string = "";
  protected _color(colorValue: number): this {
    this._buffer += `${EscOpeningChar}${colorValue}${EscColorClosingChar}`;
    return this;
  }

  protected _colorExt(colorValue: number): this {
    this._buffer += `${EscOpeningChar}38;5;${colorValue}${EscColorClosingChar}`;
    return this;
  }

  protected _bgColorExt(colorValue: number): this {
    this._buffer += `${EscOpeningChar}48;5;${colorValue}${EscColorClosingChar}`;
    return this;
  }

  constructor() {
    super();
    process.stdin.setEncoding("utf8");

    this._streamWriterDataEventHandler = void 0 as unknown as (data: Array<string>) => void;

    this.on("write", (data: Array<string>) => {
      if (this._streamWriterDataEventHandler) {
        this._streamWriterDataEventHandler(data);
      }
    });
  }

  /**
   *
   */
  set onWrite(value: (data: Array<string>) => void) {
    this._streamWriterDataEventHandler = value;
  }

  get onWrite(): (data: Array<string>) => void {
    return this._streamWriterDataEventHandler;
  }

  /**
   * Resets all color settings
   * @method reset
   */
  reset(): this {
    return this._color(0)._color(0);
  }

  clearTerminal(): this {
    process.stdout.write(`${EscOpeningChar}2J`);
    return this;
  }

  async getNextinputChoice(choices: Array<string>) : Promise<number> {
    this.listenInputs(true);
    return new Promise<number>( (r,x) => {
      process.stdin.on('keypress', (str, key) => {
        console.log(str, key)
      })
      
      this.onWrite = (data) => {
        console.log(data, data.length, data[0].length)
        data.forEach(strData => {
          switch(strData.charCodeAt(0)) {
            case 13:
              this.stopListen();
              this.newLine().write();
              r(0);
              break;
              default:
                this.write(strData.charCodeAt(0)).write(" ");
                break;
              }
              
        })

      }
    });
  }

  async getNextInput(text?: string, isPassword: boolean = false) {
    if (text) this.write(text);
    return new Promise<string>( (r,x) => {
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
        }
        this.listenInputs(true);
      } catch (ex) {
        x(ex);
      }
    });
  }

  /**
   * Draws a line onto the terminal
   * @method drawLine
   * @param {string} char
   */
  drawLine(char: string = ""): this {
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

  to(row: number, col: number): this {
    this._buffer += `${EscOpeningChar}${row};${col}${EscPositionClosingChar}`;
    return this;
  }

  toptBy(by: number) {
    this._buffer += `${"\x1B["}${by}${"A"}`;
    return this;
  }

  bottomBy(by: number) {
    this._buffer += `${"\x1B["}${by}${"B"}`;
    return this;
  }

  rightBy(by: number) {
    this._buffer += `${"\x1B["}${by}${"C"}`;
    return this;
  }

  leftBy(by: number) {
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

  row(row: number): this {
    this._buffer += `${EscOpeningChar}${row}${EscPositionClosingChar}`;
    return this;
  }

  col(col: number): this {
    this._buffer += `${EscOpeningChar};${col}${EscPositionClosingChar}`;
    return this;
  }

  ext(colorValue: number): this {
    return this._colorExt(colorValue);
  }

  bgExt(colorValue: number): this {
    return this._bgColorExt(colorValue);
  }

  text(object?: toStringType): this {
    if (!object) {
      return this;
    }
    this._buffer += object.toString();
    return this;
  }

  newLine(): this {
    this._buffer += "\n";
    return this;
  }

  stringify(object: any): this {
    this._buffer += JSON.stringify(object, null, 2);
    return this;
  }

  clear(): void {
    console.clear();
  }

  clearBuffer(): void {
    this._buffer = "";
  }

  write(object?: toStringType): this {
    if (object !== void 0) {
      this.text(object);
    }

    process.stdout.write(this._buffer);

    this._buffer = "";
    return this;
  }

  get rows(): number {
    return process.stdout["rows"] || 0;
  }

  get cols(): number {
    return process.stdout["columns"] || 0;
  }

  /**
   * Stops listening to inputs
   * This will unpipe the current stream and unregister all callbacks
   * @method stopListen
   * @return {void}
   */
  stopListen(): void {
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
  listenInputs(rawMode: boolean = false, streamWriter?: NodeJS.WritableStream & { src: BaseTerminal }): void {
    this._WritableStream = streamWriter ? streamWriter : new TerminalStreamWriter(this);

    this._WritableStream.on("write", (data: Array<string>) => {
      this.emit("write", data);
    });

    this._WritableStream.on("pipe", (src: NodeJS.ReadableStream) => {
      this._WritableStream.src = src;
      (src as any)["setRawMode"](rawMode)
    });

    process.stdin.pipe(this._WritableStream);
    process.stdin.setRawMode && process.stdin.setRawMode(rawMode);
  }
}
