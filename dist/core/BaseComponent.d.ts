export declare type TReturnableEvent = {
    guid?: string;
};
export declare type TSendQuery<T extends TReturnableEvent> = {
    sender: {
        cmpId: string;
        cmpName: string;
    };
    payload: T;
};
export declare class BaseComponent {
    private _NC_TYPE_;
    private _EvtBus;
    cmpId: string;
    cmpName: string;
    constructor();
    protected getService: <T>(serviceName: string, serviceId: string) => Promise<T>;
    /**
     * Send a new command
     * @param eventName Full name of the event
     * @param query The query description
     */
    protected _Send<T>(eventName: string, query: TSendQuery<T>): void;
    protected _SendSync<T>(eventName: string, query: TSendQuery<T>): void;
    /**
     * Send a new command and process the result
     *
     * @param eventName Full name of the event
     * @param returnEventName Full name of the event to listen in return
     * @param query The query description
     */
    protected _SendWithReturn<T extends TReturnableEvent, U extends TReturnableEvent>(eventName: string, returnEventName: string, query: TSendQuery<U>): Promise<T | undefined>;
    /**
     * Start listening to a specific event
     * @param eventName Full name of the event
     * @param handler The handler function to use process the data
     */
    protected _Receive<T>(eventName: string, handler: (data: TSendQuery<T>) => void): {
        off: () => void;
    };
    /**
     * Listen once to a specific event
     * @param eventName Full name of the event
     * @param handler  The handler function to use process the data
     */
    protected _ReceiveOnce<T>(eventName: string, handler: (data: TSendQuery<T>) => void): {
        off: () => void;
    };
    readonly identity: {
        cmpId: string;
        cmpName: string;
    };
    protected initialize(): void;
}
//# sourceMappingURL=BaseComponent.d.ts.map