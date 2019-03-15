/**
 * The MIT License (MIT)
 * Copyright (c) 2018 François Skorzec
 * Author François Skorzec
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
 * Delegate prototype for emitter event handler
 */
export interface EventBusDelegate {
    (data: any): void;
}
export interface EventBusAutoOff {
    off: () => void;
    id: number;
}
export declare type OnPoolType = {
    id: number;
    callback: EventBusDelegate;
};
export declare type OncePoolType = OnPoolType & {
    originalCallback: EventBusDelegate;
};
/**
 * This class is used as a base class for all Emitters
 * @class EventBus
 * @md
 */
export declare class EventBus {
    protected _Emitter_: {
        onPool: {
            [eventName: string]: Array<OnPoolType>;
        };
        oncePool: {
            [eventName: string]: Array<OncePoolType>;
        };
        Ids: number;
        parent: EventBus | undefined;
    };
    /**
     * @field {string} _separator
     */
    protected _separator: string;
    /**
     * @field {number} _depthLevel
     */
    protected _depthLevel: number;
    protected readonly _errors: {
        readonly eventNameBadFormat: string;
    };
    protected checkEventNameFormat(eventName?: string | undefined): boolean;
    /**
     * @constructor
     * @param {string} separator
     * @param {number} depthLevel
     */
    constructor(separator?: string, depthLevel?: number);
    /**
     * Gets all pools in one array
     */
    protected readonly pools: Array<{
        [eventName: string]: Array<OnPoolType | OncePoolType>;
    }>;
    /**
     * Gets or sets a value indicating the separator character to use in the event name
     * @prop {string} separator
     */
    separator: string;
    parent: EventBus | undefined;
    /**
     * Gets or sets a value indicating the depth of the event name
     */
    depthLevel: number;
    /**
    * Register a new event
    * @method on
    * @param {string} eventName The event name
    * @param {EmitterDelegate} callback The callback
    @md
    */
    on(eventName: string, callback: EventBusDelegate): EventBusAutoOff;
    /**
     * Register a new event that could be fired only one time
     * @method once
     * @param {string} eventName The event name
     * @param {EmitterDelegate} callback The callback
     */
    once(eventName: string, callback: EventBusDelegate): EventBusAutoOff;
    /**
     * Unregister an event
     * @method off
     * @noPrototype
     * @md
     */
    off(): void;
    off(eventName: string): void;
    off(callback: EventBusDelegate): void;
    off(callbackId: number): void;
    off(eventName: string, callback: EventBusDelegate): void;
    /**
     * Fires the specified event
     * @method emit
     * @param {string} eventName The event name
     * @param {any} data The data associated to the event
     * @return boolean
     * @md
     */
    emit(eventName: string, data?: any): boolean;
    /**
     * Fires the specified event but in an async way
     * @method emit
     * @param {string} eventName The event name
     * @param {any} data The data associated to the event
     * @return boolean
     * @md
     */
    emitAsync(eventName: string, data?: any): boolean;
}
//# sourceMappingURL=EventBus.d.ts.map