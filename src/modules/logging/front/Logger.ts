import { BaseComponent } from "../../../Plugin";
import { Acts, Evts } from "../Events";
import { sendQuery } from "../../../core/BaseComponent";

export class Logger extends BaseComponent {
  cmpName = "logging.front.logger";
  cmpId   = "com.shadow-nuclues.core";

  static hasBeenInitialized: boolean = false;
  
  constructor() {
    super();
  }

  protected initialize() {
    if (Logger.hasBeenInitialized) {
      return;
    } else {
      Logger.hasBeenInitialized = true;
    }
    
    this._Receive<any[]>(Acts.LOGGING.LOGGER.LOG, (data) => {
      console.log(...data.payload);
      this._send(Evts.LOGING.LOGGER.LOGGED, data);
    });

    this._Receive<any[]>(Acts.LOGGING.LOGGER.WARN, (data) => {
      console.warn(...data.payload);
      this._send(Evts.LOGING.LOGGER.WARNED, data);
    });

    this._Receive<any[]>(Acts.LOGGING.LOGGER.INFO, (data) => {
      console.info(...data.payload);
      this._send(Evts.LOGING.LOGGER.INFORMED, data);
    });
  }

  log(...args: any[]): void {
    this._send(Acts.LOGGING.LOGGER.LOG, {
      sender: this.identity,
      payload: args
    });
  }

  warn(...args: any[]): void {
    this._send(Acts.LOGGING.LOGGER.WARN, {
      sender: this.identity,
      payload: args
    });
  }

  info(...args: any[]): void {
    this._send(Acts.LOGGING.LOGGER.INFO, {
      sender: this.identity,
      payload: args
    });
  }
}
export interface ILogger {
    log(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
}