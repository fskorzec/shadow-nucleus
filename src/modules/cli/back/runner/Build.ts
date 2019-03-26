import { BaseComponent } from "../../../../Plugin";
import { Guid } from "../../../../shared/text/Guid";
import { TCompilerWriteFileArg, Evts as TscEvts, TCompileQueryArg, TCompilerResultQueryArg, TDiagnosticArg, TCompilerResultQuery} from "../../../typescript/back/Events";
import * as path from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";

export class Build {
  public static async buildModule(this: BaseComponent, modulePath: string, target: "back" | "front") {
    const compileStepGuid = Guid.getGuid();

    let compiledFiles = {} as {
      [fileName: string] : string;
    };

    let compiledErrors = {} as {
      [fileName: string] : any;
    };

    this._Receive<TCompilerWriteFileArg>(TscEvts.TSC.COMPILER.WRITE_FILE, data => {
      compiledFiles["_filled"] = "true";
      compiledFiles[data.payload.path] = data.payload.content;
    });

    this._Receive<TDiagnosticArg>(TscEvts.TSC.DIAGNOSTIC.ERROR, data => {
      compiledErrors["_filled"] = true;
      compiledErrors[data.payload.fileName] = data.payload;
    });

    try {
      const compileresult = await this._SendWithReturn<TCompilerResultQuery, TCompileQueryArg>(TscEvts.TSC.COMPILER.COMPILE, TscEvts.TSC.COMPILER.COMPILED, {
        sender: this.identity,
      payload: {
        guid: compileStepGuid,
        sources: [modulePath],
        options: {
          target                 : 2     ,
          module                 : 1     ,
          jsx                    : 2     ,
          strict                 : false ,
          esModuleInterop        : true  ,
          experimentalDecorators : true  ,
          outDir                 : "./out2"
        }
      }
    });
  } catch(ex) {
    console.log("Error", ex)
  }

     if (compiledErrors._filled) {
       //console.log("Errors", compiledErrors)
     }

     if (compiledFiles._filled) {
      var regexIocResolve = new RegExp('__decorate\\(\\[.*?IocResolve\\((.*?)\\).*?\\],\\s*(.*?),\\s*"(.*?)"','is');
      var regexIocInject  = new RegExp('(\\w*?) = __decorate\\(\\[.*?IocInject\\((.*?)\\).*?\\],\\s*(.*?)\\);','is');

      function ensureDirectoryExistence(filePath: string) {
        var dirname = path.dirname(filePath);
        if (existsSync(dirname)) {
          return true;
        }
        ensureDirectoryExistence(dirname);
        mkdirSync(dirname);
      }

      
      for(let i in compiledFiles) {
        if (i !== "_filled") {
          var match = regexIocResolve.exec(compiledFiles[i]);
          if (match) {
            console.log(`Resolve request detected in file ${i}, Property ${match[3]} in class ${match[2].split(".")[0]} is of type ${match[1]}`);
          }

          var match = regexIocInject.exec(compiledFiles[i]);
          if (match) {
            var regexName = new RegExp(match[1] + ' = class ' + match[3] + ' extends .*?this\\.serviceName = "(.*?)"','is').exec(compiledFiles[i]);
            var regexId = new RegExp(match[1] + ' = class ' + match[3] + ' extends .*?this\\.serviceId = "(.*?)"','is').exec(compiledFiles[i]);
            console.log(`Inject request detected in file ${i}, Class ${match[3]} whose generated name is ${match[1]} is registered in module { name : ${regexName && regexName[1]}, id: ${regexId && regexId[1]} as type ${match[2]}}`);
          }
        }

        ensureDirectoryExistence(i);
        writeFileSync(i,compiledFiles[i],{encoding:"utf8", flag:"w"});
      }


     }
    

  }
}