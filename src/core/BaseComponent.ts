import { Errors }   from "./constant/Error"         ;
import { IEventBus } from "./IEventBus";

export type TReturnableEvent = {
  guid?: string;
}

export type TSendQuery<T extends TReturnableEvent> = {
  sender: {
    serviceId   : string ;
    serviceName : string ;
  };
  payload: T;
}

export interface IPrivateBaseComponent {
  _EvtBus: IEventBus | undefined;
  getService: <T>(serviceName: string, serviceId: string) => Promise<T>;
  _Send<T>(eventName: string, query: TSendQuery<T>) : void;
  _SendSync<T>(eventName: string, query: TSendQuery<T>) : void;
  _SendWithReturn<T extends TReturnableEvent,U extends TReturnableEvent>(
    eventName       : string , 
    returnEventName : string ,  
    query           : TSendQuery<U>
  ): Promise<T | undefined>;
  _Receive<T>(eventName: string, handler: (data: TSendQuery<T>) => void) : { off: () => void };
  _ReceiveOnce<T>(eventName: string, handler: (data: TSendQuery<T>) => void) : { off: () => void };
}

export class BaseComponent {
  private _NC_TYPE_ = "BaseComponent";

  private _EvtBus: IEventBus | undefined;

  serviceId   : string = "";
  serviceName : string = "";

  constructor() {}

  protected getService: <T>(serviceName: string, serviceId: string) => Promise<T> = 
    void 0 as unknown as <T>(serviceName: string, serviceId: string) => Promise<T>;

  /**
   * Send a new command
   * @param eventName Full name of the event
   * @param query The query description
   */
  protected _Send<T>(eventName: string, query: TSendQuery<T>) : void {
    if (this._EvtBus) {
      this._EvtBus.emitAsync(eventName, query);
    }
  }

  protected _SendSync<T>(eventName: string, query: TSendQuery<T>) : void {
    if (this._EvtBus) {
      this._EvtBus.emit(eventName, query);
    }
  }

  /**
   * Send a new command and process the result
   * 
   * @param eventName Full name of the event
   * @param returnEventName Full name of the event to listen in return
   * @param query The query description
   */
  protected _SendWithReturn<T extends TSendQuery<TReturnableEvent>,U extends TReturnableEvent>(eventName: string, returnEventName: string,  query: TSendQuery<U>): Promise<T> {
    return new Promise( (resolve, reject) => {
      if (query.payload.guid === null || query.payload.guid === void 0) {
        reject(Error(Errors.TECHNICAL.GUID_IS_MISSING));
      }

      if (this._EvtBus) {
        const offEvent = this._EvtBus.on(returnEventName, (data: T) => {
          if (data.payload.guid === query.payload.guid) {
            offEvent.off();
            resolve(data);
          }          
        });
        this._EvtBus.emitAsync(eventName, query);
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
    if (this._EvtBus) {
      return this._EvtBus.on(eventName, handler);
    }
    return { off: () => void 0 };
  }

  /**
   * Listen once to a specific event
   * @param eventName Full name of the event
   * @param handler  The handler function to use process the data
   */
  protected _ReceiveOnce<T>(eventName: string, handler: (data: TSendQuery<T>) => void) : { off: () => void } {
    if (this._EvtBus) {
      return this._EvtBus.once(eventName, handler);
    }
    return { off: () => void 0 };
  }

  get identity() : {
    serviceId   : string;
    serviceName : string;
  } {
    return {
      serviceId   : this.serviceId,
      serviceName : this.serviceName
    }
  }

  protected initialize() {
    
  }
}