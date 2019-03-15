export declare type sendQuery<T> = {
    sender: {
        cmpId: string;
        cmpName: string;
    };
    payload: T;
};
export declare class BaseComponent {
    private _NC_TYPE_;
    private _evtBus;
    cmpId: string;
    cmpName: string;
    constructor();
    protected getService: <T>(serviceName: string, serviceId: string) => Promise<T>;
    /**
     * Send a new command
     * @param eventName Full name of the event
     * @param query The query description
     */
    protected _send<T>(eventName: string, query: sendQuery<T>): void;
    protected _sendSync<T>(eventName: string, query: sendQuery<T>): void;
    /**
     * Send a new command and process the result
     * @param eventName Full name of the event
     * @param returnEventName Full name of the event to listen in return
     * @param query The query description
     */
    protected _sendWithReturn<T, U>(eventName: string, returnEventName: string, query: sendQuery<U>): Promise<T | undefined>;
    /**
     * Start listening to a specific event
     * @param eventName Full name of the event
     * @param handler The handler function to use process the data
     */
    protected _Receive<T>(eventName: string, handler: (data: sendQuery<T>) => void): {
        off: () => void;
    };
    /**
     * Listen once to a specific event
     * @param eventName Full name of the event
     * @param handler  The handler function to use process the data
     */
    protected _ReceiveOnce<T>(eventName: string, handler: (data: sendQuery<T>) => void): {
        off: () => void;
    };
    readonly identity: {
        cmpId: string;
        cmpName: string;
    };
    protected initialize(): void;
}
//# sourceMappingURL=BaseComponent.d.ts.map