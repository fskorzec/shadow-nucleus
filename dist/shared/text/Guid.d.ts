/**
* The MIT License (MIT)
* Copyright (c) <2016> <Beewix>
* Author <François Skorzec>
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
/**
 * Guid implementation based on Random generation (RFC V4)
 * @class Guid
 */
export declare class Guid {
    /**
     * Internal field that contains all Guid parts
     * @scope {protected}
     * @field {any} _Guid_
     */
    protected _Guid_: {
        toString: string;
        part1: number;
        part2: number;
        part3: number;
        part4: number;
        part5: number;
    };
    protected static generate2bytesNumber(): [number, string];
    protected static generate4bytesNumber(): [number, string];
    protected static generate6bytesNumber(): [number, string];
    protected static pad(txt: string, size: number): string;
    /**
     * @constructor
     */
    constructor();
    /**
     * Gets the part1
     */
    readonly part1: number;
    /**
     * Gets the part2
     */
    readonly part2: number;
    /**
     * Gets the part3
     */
    readonly part3: number;
    /**
     * Gets the part 4
     */
    readonly part4: number;
    /**
     * Gets the part 5
     */
    readonly part5: number;
    /**
     * Gets a string representation of the Guid
     * @method toString
     * @return {string}
     */
    toString(): string;
    /**
     * Gets a string Guid without a Guid Object
     * @static
     * @method getGuid
     * @return {string}
     */
    static getGuid(): string;
}
//# sourceMappingURL=Guid.d.ts.map