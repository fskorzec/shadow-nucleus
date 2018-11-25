import { IService } from "./service/IService" ;
import { IModule }  from "./module/IModule"   ;

export interface IApi {
  Service : IService ;
  Module  : IModule  ;
}
