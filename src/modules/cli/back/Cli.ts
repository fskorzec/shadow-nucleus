import { BaseComponent } from "../../../Plugin";
import { Evts } from "./Events";
import { CommandArgs } from "../../../console/Args";
import { Package } from "../../../console/TPackages";

declare var Services: any;

export class Logger extends BaseComponent {
  cmpName = "logging.front.logger"    ;
  cmpId   = "com.shadow-nuclues.core" ;

  _packages: {
    [index: string]: CLI_PACKAGE
  } = {}

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
    
    this._Receive<CLI_PACKAGE>(Evts.CLI.PACKAGE.REGISTER, (data) => {
      this._packages[data.payload.doc.name || ""] = data.payload;
      this._send(Evts.CLI.PACKAGE.REGISTER, data);
    });

    this._Receive<CommandArgs>(Evts.CLI.RUNNER.EXECUTE, (data) => {
      console.log(data.payload);
    });
  }
}

type CLI_PACKAGE = {
  runner: (args: CommandArgs) => void;
  doc: Package;
}