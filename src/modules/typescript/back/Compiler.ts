import { BaseComponent } from "../../../Plugin";
import { Evts, TCompileQuery, TCompilerWriteFile, TCompilerWriteFileArg, TDiagnosticArg, TCompilerResultQueryArg } from "./Events";
import * as ts from "typescript";
import * as path from "path";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { TSendQuery } from "../../../core/BaseComponent";
import { compileFunction } from "vm";
import { JSONstringify } from "../../../core/util/Text";
import { IocInject } from "../../../core/util/Ioc";

declare var Services: any;

@IocInject("ICompiler")
export class Compiler extends BaseComponent {
  serviceName = "tsc"    ;
  serviceId   = "com.nucleus" ;

  static hasBeenInitialized: boolean = false;
  
  constructor() {
    super();
  }

  protected initialize() {
    if (Compiler.hasBeenInitialized) {
      return;
    } else {
      Compiler.hasBeenInitialized = true;

      this._Receive(Evts.TSC.COMPILER.COMPILE, (data: TCompileQuery) => {
        this.compile(data.payload.sources, data.payload.options || {}, [], data);
      });
    }
  
  }


  compile(fileNames: string[], options: ts.CompilerOptions , moduleSearchLocations: Array<string>, data?: TCompileQuery): void {
    (ts as any).getDefaultLibFilePath = (options: any) => {
      return "/lib";
    };

    let host = ts.createCompilerHost({});



    host.getDefaultLibLocation = (...args: any[]) => {
      return "/lib/";
    }

    host.getDefaultLibFileName = (...args: any[]) => {
      return "/lib/lib.es6.d.ts";
    }

    options.noEmitOnError = true;

    let program    = ts.createProgram(fileNames, options, host);
    (program as any).getCurrentDirectory = null;
    let emitResult = program.emit(undefined , (filePath,fileContent) => {
      
      /*function ensureDirectoryExistence(filePath: string) {
        var dirname = path.dirname(filePath);
        if (existsSync(dirname)) {
          return true;
        }
        ensureDirectoryExistence(dirname);
        mkdirSync(dirname);
      }
      ensureDirectoryExistence(filePath);
      writeFileSync(filePath,fileContent,{encoding:"utf8", flag:"w"});*/

      this._SendSync<TCompilerWriteFileArg>(Evts.TSC.COMPILER.WRITE_FILE, {
        sender: this.identity,
        payload: {
          guid    : (data && data.payload.guid) || "CLI" ,
          path    : filePath                             ,
          content : fileContent                          ,
        }
      });
    })

  
    let allDiagnostics = emitResult.diagnostics
      //.getPreEmitDiagnostics(program)
      //.concat(emitResult.diagnostics);
  
    allDiagnostics.forEach(diagnostic => {
      if (diagnostic.file) {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
          diagnostic.start!
        );
        let message = ts.flattenDiagnosticMessageText(
          diagnostic.messageText,
          "\n"  
        );
        this._SendSync<TDiagnosticArg>(Evts.TSC.DIAGNOSTIC.ERROR, {
          sender: this.identity,
          payload: {
            guid            : (data && data.payload.guid) || "CLI"                                     ,
            fileName        : diagnostic.file.fileName                                                 ,
            message         : message                                                                  ,
            fullMessage     : `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}` ,
            position        : [line + 1, character + 1]                                                ,
            innerDiagnostic : JSONstringify(diagnostic)
          }
        })
      } else {
        this._SendSync<TDiagnosticArg>(Evts.TSC.DIAGNOSTIC.ERROR, {
          sender: this.identity,
          payload: {
            guid            : (data && data.payload.guid) || "CLI" ,
            fileName        : ""                                   ,
            message         : ""                                   ,
            fullMessage     : `${diagnostic.messageText}`          ,
            position        : [-1,-1]                              ,
            innerDiagnostic : JSONstringify(diagnostic)
          }
        })
      }
    });
  
    let exitCode = emitResult.emitSkipped ? 1 : 0;
    
    this._SendSync<TCompilerResultQueryArg>(Evts.TSC.COMPILER.COMPILED, {
      sender: this.identity,
      payload: {
        guid     : (data && data.payload.guid) || "CLI" ,
        exitCode : exitCode
      }
    });

  }

}

export interface ICompiler {
  new (): ICompiler;
}