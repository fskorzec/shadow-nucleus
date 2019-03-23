import { Compiler } from "./Compiler";
import { Doc } from "./Cli";

import { 
  IModuleEntryPoint, 
  IApi, 
  connect 
} from "../../../Plugin";
import { CommandArgs } from "../../../console/Args";
import { ScriptTarget, ModuleKind, JsxEmit } from "typescript";



export default class CompilerPackage implements IModuleEntryPoint {
  async entryPoint(api: IApi): Promise<void> {
    const _Compiler = await api.Service.resolve<Compiler>(Compiler);

    await api.Service.registerService(_Compiler.cmpName, _Compiler.cmpId, {
      serviceInstance: _Compiler
    });

    _Compiler["_SendSync"]<any>("CLI.PACKAGE.REGISTER", {
      sender: _Compiler.identity,
      payload: {
        doc: Doc,
        runner: (params: CommandArgs) => {
          console.log(`Trying to compile ${params.parameters.src}`);
          _Compiler.compile([params.parameters["src"]], {
            target          : ScriptTarget.ES2015 ,
            module          : ModuleKind.CommonJS ,
            jsx             : JsxEmit.React       ,
            strict          : false               ,
            esModuleInterop : true                ,
            outDir:params.parameters["dst"]
          }, []);
          console.log(`End of compilation process`);
        }
      }
    });
  }
}

connect(CompilerPackage);