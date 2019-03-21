import { constantTree } from "../../../core/util/Constant";
import { sendQuery as TSendQuery } from "../../../core/BaseComponent";
import { CompilerOptions } from "typescript";

const Evts = constantTree({
  TSC: {
    COMPILER: {
      COMPILE    : "" ,
      COMPILED   : "" ,
      WRITE_FILE : "" ,
    },
    DIAGNOSTIC: {
      ERROR : ""
    }
  }
});

export type TCompileQuery = TSendQuery<TCompileQueryArg>;
export type TCompileQueryArg = {
  guid     : string          ;
  options? : CompilerOptions ;
  sources  : Array<string>   ;
}

export type TCompilerWriteFile = TSendQuery<TCompilerWriteFileArg>;
export type TCompilerWriteFileArg = {
  guid    : string ;
  path    : string ;
  content : string ;
}

export type TDiagnostic = TSendQuery<TDiagnosticArg>;
export type TDiagnosticArg = {
  guid            : string           ;
  fileName        : string           ;
  position        : [number, number] ;
  message         : string           ;
  fullMessage     : string           ;
  innerDiagnostic : string           ;
};

export type TCompilerResultQuery = TSendQuery<TCompilerResultQueryArg>;
export type TCompilerResultQueryArg = {
  guid     : string ;
  exitCode : number ;
};

export {
  Evts
};
