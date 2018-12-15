import { BaseComponent }    from "./core/BaseComponent" ;
import { IModuleEntryPoint} from "./core/IModule"       ;
import { IApi }             from "./core/api/IApi"      ;
import * as UtilEnv         from "./core/util/Env"      ;
import * as UtilConstant    from "./core/util/Constant" ;     ;

declare var _nucleus: any;

export function connect(module: any) {
  _nucleus(module);
}

export {
  BaseComponent     ,
  IModuleEntryPoint ,
  IApi              ,
  UtilEnv           ,
  UtilConstant
};