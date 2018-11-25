import { BaseComponent }    from "./core/BaseComponent" ;
import { IModuleEntryPoint} from "./core/IModule"       ;
import { IApi }             from "./core/api/IApi"      ;
import { isNode }           from "./core/util/Env"      ;

declare var _nucleus: any;

export function connect(module: any) {
  _nucleus(module);
}

export {
  BaseComponent,
  IModuleEntryPoint,
  IApi
};