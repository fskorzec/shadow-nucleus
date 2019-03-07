import { BaseComponent }    from "./core/BaseComponent" ;
import { IModuleEntryPoint} from "./core/IModule"       ;
import { IApi }             from "./core/api/IApi"      ;
import * as UtilEnv         from "./core/util/Env"      ;
import * as UtilConstant    from "./core/util/Constant" ;
import { Ioc }              from "./core/util/Ioc";

declare var _nucleus: any;

export async function connect(module: any) {
  await _nucleus(module);
}

export {
  BaseComponent     ,
  IModuleEntryPoint ,
  IApi              ,
  UtilEnv           ,
  UtilConstant      ,
  Ioc
};