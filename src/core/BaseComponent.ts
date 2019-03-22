import { Errors }   from "./constant/Error"         ;
import { IEventBus } from "./IEventBus";

export type TReturnableEvent = {
  guid: string;
}

export type TSendQuery<T> = {
  sender: {
    cmpId   : string ;
    cmpName : string ;
  };
  payload: T;
}

export class BaseComponent {
  private _NC_TYPE_ = "BaseComponent";

  private _evtBus: IEventBus | undefined;

  cmpId   : string = "";
  cmpName : string = "";

  constructor() {}

  protected getService: <T>(serviceName: string, serviceId: string) => Promise<T> = 
    void 0 as unknown as <T>(serviceName: string, serviceId: string) => Promise<T>;

  /**
   * Send a new command
   * @param eventName Full name of the event
   * @param query The query description
   */
  protected _send<T>(eventName: string, query: TSendQuery<T>) : void {
    if (this._evtBus) {
      this._evtBus.emitAsync(eventName, query);
    }
  }

  protected _sendSync<T>(eventName: string, query: TSendQuery<T>) : void {
    if (this._evtBus) {
      this._evtBus.emit(eventName, query);
    }
  }

  /**
   * Send a new command and process the result
   * 
   * @param eventName Full name of the event
   * @param returnEventName Full name of the event to listen in return
   * @param query The query description
   */
  protected _sendWithReturn<T extends TReturnableEvent,U extends TReturnableEvent>(eventName: string, returnEventName: string,  query: TSendQuery<U>): Promise<T | undefined> {
    if (query.payload.guid === null || query.payload.guid === void 0) {
      throw Error(Errors.TECHNICAL.GUID_IS_MISSING);
    }

    return new Promise( (resolve, reject) => {
      if (this._evtBus) {
        this._evtBus.on(returnEventName, (data: T) => {
          if (data.guid === query.payload.guid) {
            resolve(data);
          }          
        });
        this._evtBus.emitAsync(eventName, query);
      } else {
        reject(Error(Errors.TECHNICAL.EVENTBUS_IS_NOT_DEFINED));
      }
    });
  }

  /**
   * Start listening to a specific event
   * @param eventName Full name of the event
   * @param handler The handler function to use process the data
   */
  protected _Receive<T>(eventName: string, handler: (data: TSendQuery<T>) => void) : { off: () => void } {
    if (this._evtBus) {
      return this._evtBus.on(eventName, handler);
    }
    return { off: () => void 0 };
  }

  /**
   * Listen once to a specific event
   * @param eventName Full name of the event
   * @param handler  The handler function to use process the data
   */
  protected _ReceiveOnce<T>(eventName: string, handler: (data: TSendQuery<T>) => void) : { off: () => void } {
    if (this._evtBus) {
      return this._evtBus.once(eventName, handler);
    }
    return { off: () => void 0 };
  }

  get identity() : {
    cmpId: string;
    cmpName: string;
  } {
    return {
      cmpId   : this.cmpId,
      cmpName : this.cmpName
    }
  }

  protected initialize() {
    
  }
}