import { BaseComponent } from "../../../Plugin";
import { Acts, Evts } from "../Events";
import { IocInject } from "../../../core/util/Ioc";

declare var Services: any;

@IocInject("ILogger")
export class Logger extends BaseComponent {
  serviceName = "logger"      ;
  serviceId   = "com.nucleus" ;

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
      this._Send(Evts.LOGING.LOGGER.LOGGED, data);
    });

    this._Receive<any[]>(Acts.LOGGING.LOGGER.WARN, (data) => {
      console.warn(...data.payload);
      this._Send(Evts.LOGING.LOGGER.WARNED, data);
    });

    this._Receive<any[]>(Acts.LOGGING.LOGGER.INFO, (data) => {
      console.info(...data.payload);
      this._Send(Evts.LOGING.LOGGER.INFORMED, data);
    });
  }

  log(...args: any[]): void {
    this._Send(Acts.LOGGING.LOGGER.LOG, {
      sender: this.identity,
      payload: args
    });
  }

  warn(...args: any[]): void {
    this._Send(Acts.LOGGING.LOGGER.WARN, {
      sender: this.identity,
      payload: args
    });
  }

  info(...args: any[]): void {
    this._Send(Acts.LOGGING.LOGGER.INFO, {
      sender: this.identity,
      payload: args
    });
  }
}

export interface ILogger {
    identity     : any          ;
    log(...args  : any[]): void ;
    warn(...args : any[]): void ;
    info(...args : any[]): void ;
}