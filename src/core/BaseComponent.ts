import { Errors }   from "./constant/Error"         ;
import { IEventBus } from "./IEventBus";

export type sendQuery = {
  sender: {
    cmpId   : string ;
    cmpName : string ;
  };
  payload: unknown;
}

export abstract class BaseComponent {
  private _evtBus: IEventBus | undefined;

  abstract cmpId   : string ;
  abstract cmpName : string ;

  protected _send(eventName: string, query: sendQuery) : void {
    if (this._evtBus) {
      this._evtBus.emitAsync(eventName, query);
    }
  }

  protected _sendWithReturn<T>(eventName: string, returnEventName: string,  query: sendQuery): Promise<T | undefined> {
    return new Promise( (resolve, reject) => {
      if (this._evtBus) {
        this._evtBus.once(returnEventName, (data) => {
          resolve(data);
        });
        this._evtBus.emitAsync(eventName, query);
      } else {
        reject(Error(Errors.TECHNICAL.EVENTBUS_IS_NOT_DEFINED));
      }
    });
  }

}