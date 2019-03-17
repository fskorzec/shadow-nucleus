import { Package, Command } from "../../../console/TPackages";

export const Doc = {
  name:"tsc",
  shortDescription:"Compiler service",
  description:"Compiler service",
  commands:{
    compile:{
      name:"compile",
      description:"Compile source files",
      shortDescription:"Compile source files",
      exemples:["src=./source.ts dst=."],
      parameters: {
        src: {
          name:"src",
          description:"The source file",
          required:true,
          type:"string"
        },
        dst: {
          name:"dst",
          description:"The destination path",
          required: false,
          type:"string"
        }
      }
    }
  }
} as Partial<Package>;