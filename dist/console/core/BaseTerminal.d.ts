/// <reference types="node" />
import { EventEmitter } from "events";
/**
 * Defines a compatible type with a toString function
 */
export declare type toStringType = {
    toString: () => string;
};
/**
 * Defines a base class for terminal shell
 * @class BaseTerminal
 * @abstract
 */
export declare abstract class BaseTerminal extends EventEmitter {
    protected _x: number;
    protected _y: number;
    protected _streamWriterDataEventHandler: (data: Array<string>) => void;
    protected _buffer: string;
    protected _color(colorValue: number): this;
    protected _colorExt(colorValue: number): this;
    protected _bgColorExt(colorValue: number): this;
    constructor();
    /**
     *
     */
    onWrite: (data: Array<string>) => void;
    /**
     * Resets all color settings
     * @method reset
     */
    reset(): this;
    clearTerminal(): this;
    /**
     * Draws a line onto the terminal
     * @method drawLine
     * @param {string} char
     */
    drawLine(char?: string): this;
    to(row: number, col: number): this;
    toptBy(by: number): this;
    bottomBy(by: number): this;
    rightBy(by: number): this;
    leftBy(by: number): this;
    saveCursorPosition(): this;
    restoreCursorPosition(): this;
    clearLine(): this;
    row(row: number): this;
    col(col: number): this;
    ext(colorValue: number): this;
    bgExt(colorValue: number): this;
    text(object?: toStringType): this;
    newLine(): this;
    stringify(object: any): this;
    clear(): void;
    clearBuffer(): void;
    write(object?: toStringType): this;
    readonly rows: number;
    readonly cols: number;
    /**
     * Stops listening to inputs
     * This will unpipe the current stream and unregister all callbacks
     * @method stopListen
     * @return {void}
     */
    stopListen(): void;
    /**
     * Listen to inputs
     * By default it will start listening to inputs and let you get inputs by registering on write event.
     * You can set your own StreamWriter. In that case, the write event will not be fired
     * @method listenInputs
     * @param {boolean} rawMode If true the Terminal will listen Key data, otherwise string data
     */
    listenInputs(rawMode?: boolean, streamWriter?: NodeJS.WritableStream & {
        src: BaseTerminal;
    }): void;
}
//# sourceMappingURL=BaseTerminal.d.ts.map