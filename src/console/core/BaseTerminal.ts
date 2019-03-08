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

    console.log(this._buffer);

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
    process.stdin.unpipe();
  }

  /**
   * Listen to inputs
   * By default it will start listening to inputs and let you get inputs by registering on write event.
   * You can set your own StreamWriter. In that case, the write event will not be fired
   * @method listenInputs
   * @param {boolean} rawMode If true the Terminal will listen Key data, otherwise string data
   */
  listenInputs(rawMode: boolean = false, streamWriter?: NodeJS.WritableStream & { src: BaseTerminal }): void {
    let stream = streamWriter ? streamWriter : new TerminalStreamWriter(this);

    stream.on("write", (data: Array<string>) => {
      this.emit("write", data);
    });

    stream.on("pipe", (src: NodeJS.ReadableStream) => {
      stream.src = src;
      (src as any)["setRawMode"](rawMode);
    });

    process.stdin.pipe(stream);
  }
}
