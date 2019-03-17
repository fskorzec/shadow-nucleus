import { Webpack } from "./Webpack";

import { 
  IModuleEntryPoint, 
  IApi, 
  connect 
} from "../../../Plugin";

export default class WebpackPackage implements IModuleEntryPoint {
  async entryPoint(api: IApi): Promise<void> {
    const _Webpack = await api.Service.resolve<Webpack>(Webpack);

    await api.Service.registerService(_Webpack.cmpName, _Webpack.cmpId, {
      serviceInstance: _Webpack
    });

    
  }
}

connect(WebpackPackage);