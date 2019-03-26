import { BaseComponent } from "../../../../Plugin";
import { Guid } from "../../../../shared/text/Guid";
import * as path from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { TSendQuery, TReturnableEvent } from "../../../../core/BaseComponent";
import { TEnvInfo } from "../../../../core/constant/Cli";

export class New {
  public static async newModule(this: BaseComponent, options: {
    modulePath ?: string,
    moduleName  : string
  } ) {
    options.modulePath = options.modulePath || ".";

    const env = (await this._SendWithReturn<TSendQuery<TEnvInfo & TReturnableEvent>, TReturnableEvent>("CLI.ENV.GET_INFO", "CLI.ENV.INFO_GOTTEN", {
      sender: this.identity,
      payload: {
        guid: Guid.getGuid()
      }
    })).payload;

    console.log(JSON.stringify(env, null, 2))
  }       
}