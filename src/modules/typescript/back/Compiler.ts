import { BaseComponent } from "../../../Plugin";
import { Evts } from "./Events";
import * as ts from "typescript";
import * as path from "path";
import { writeFileSync, existsSync, mkdirSync } from "fs";

declare var Services: any;

export class Compiler extends BaseComponent {
  cmpName = "tsc"    ;
  cmpId   = "com.nucleus" ;

  static hasBeenInitialized: boolean = false;
  
  constructor() {
    super();
  }

  protected initialize() {
    if (Compiler.hasBeenInitialized) {
      return;
    } else {
      Compiler.hasBeenInitialized = true;
    }
  
  }

  createCompilerHost(
    options: ts.CompilerOptions,
    moduleSearchLocations: string[]
  ): ts.CompilerHost {
    return {
      getSourceFile,
      getDefaultLibFileName: () => "lib.d.ts",
      writeFile: (fileName, content) => ts.sys.writeFile(fileName, content),
      getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
      getDirectories: path => ts.sys.getDirectories(path),
      getCanonicalFileName: fileName =>
        ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
      getNewLine: () => ts.sys.newLine,
      useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
      fileExists,
      readFile,
      resolveModuleNames
    };
  
    function fileExists(fileName: string): boolean {
      console.log("fileExists", fileName);
      return ts.sys.fileExists(fileName);
    }
  
    function readFile(fileName: string): string | undefined {
      console.log("readFile", fileName);
      return ts.sys.readFile(fileName);
    }
  
    function getSourceFile(
      fileName: string,
      languageVersion: ts.ScriptTarget,
      onError?: (message: string) => void
    ) {
      console.log("getSourceFile", fileName);
      const sourceText = ts.sys.readFile(fileName);
      return sourceText !== undefined
        ? ts.createSourceFile(fileName, sourceText, languageVersion)
        : undefined;
    }
  
    function resolveModuleNames(
      moduleNames: string[],
      containingFile: string
    ): ts.ResolvedModule[] {

      console.log("resolveModuleNames", moduleNames, "containingFile", containingFile)

      const resolvedModules: ts.ResolvedModule[] = [];
      for (const moduleName of moduleNames) {
        if (moduleName !== "fs" && moduleName !== "path") {
          
          // try to use standard resolution
          let result = ts.resolveModuleName(moduleName, containingFile, options, {
            fileExists,
            readFile
          });
          if (result.resolvedModule) {
            resolvedModules.push(result.resolvedModule);
          } else {
            // check fallback locations, for simplicity assume that module at location
            // should be represented by '.d.ts' file
            for (const location of moduleSearchLocations) {
              const modulePath = path.join(location, moduleName + ".d.ts");
              if (fileExists(modulePath)) {
                resolvedModules.push({ resolvedFileName: modulePath });
              }
            }
          }
          
        }

      }
      return resolvedModules;
    }
  }

  compile(fileNames: string[], options: ts.CompilerOptions, moduleSearchLocations: Array<string>): void {
    (ts as any).getDefaultLibFilePath = (options: any) => {
      console.log(`Calling getDefaultLibFilePath returning </lib/>`);
      return "/lib";
    };

    /*(ts as any)._createCompilerHost = (ts as any).createCompilerHost;

    (ts as any).createCompilerHost = undefined (...args: Array<any>) => {
      console.log("Hooked createCompilerHost function");
      return (ts as any)._createCompilerHost(...args);
    }*/

    let host = ts.createCompilerHost({});



    host.getDefaultLibLocation = (...args: any[]) => {
      return "/lib/";
    }

    host.getDefaultLibFileName = (...args: any[]) => {
      return "/lib/lib.es6.d.ts";
    }

    let program    = ts.createProgram(fileNames, options, host);
    (program as any).getCurrentDirectory = null;
    let emitResult = program.emit(undefined , (s,b) => {
      
      console.log(s)
      function ensureDirectoryExistence(filePath: string) {
        var dirname = path.dirname(filePath);
        if (existsSync(dirname)) {
          return true;
        }
        ensureDirectoryExistence(dirname);
        mkdirSync(dirname);
      }
      ensureDirectoryExistence(s);
      writeFileSync(s,b,{encoding:"utf8", flag:"w"});
    })

  
    let allDiagnostics = ts
      .getPreEmitDiagnostics(program)
      .concat(emitResult.diagnostics);
  
    allDiagnostics.forEach(diagnostic => {
      if (diagnostic.file) {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
          diagnostic.start!
        );
        let message = ts.flattenDiagnosticMessageText(
          diagnostic.messageText,
          "\n"
        );
        console.log(
          `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
        );
      } else {
        console.log(
          `${ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")}`
        );
      }
    });
  
    let exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log(`Process exiting with code '${exitCode}'.`);
    process.exit(exitCode);
  }

}

export interface ICompiler {
  
}