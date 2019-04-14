import { Package, App } from "../../../../console/TPackages";

export const module = {
  name             : "module"                      ,
  shortDescription : "All modules related actions" ,
  description      : "Create / Install / Remove and manage modules." ,
  commands: {
    build: {
      name             : "build"          ,
      shortDescription : "Build a module" ,
      description:"Build a module and all the services",
      parameters:{
        mod: {
          name     : "mod" ,
          type     : "string",
          required : true,
          description:"The module's name",
          exemples: [
            "myTargetModule"
          ]
        },
        target: {
          name     : "target" ,
          type     : "string",
          required : true,
          description:"the target, should be <back> or <front>",
          exemples: [
            "back",
            "front"
          ]
        },
        tsc: {
          name     : "tsc" ,
          type     : "string",
          required : false,
          description:"The path to the tsconfig file to use instead of default parameters",
          exemples: [
            "../",
          ]
        },
        wp: {
          name     : "wp" ,
          type     : "string",
          required : false,
          description:"The path to the webpack config file to use instead of default parameters",
          exemples: [
            "../"
          ]
        }
      }
    },
    new: {
      name:"new",
      shortDescription:"Create a new module",
      description: "Create a new module with all necessary code templates",
      parameters: {
        name:{
          name:"name",
          type:"string",
          description:"Module name",
          exemples:["nc-package"]
        },
        dest: {
          name        : "path"                                                                        ,
          description : `  Destination folder to create files in. By default, '.' is the target folder
  If running th ecommand from th eroot directory, it will creates packages in ./src/packages` ,
          required    : false                                                                         ,
          type        : "string",
          exemples : [
            ".",
            "./destinationFolder"
          ]
        }
      }
    },
    add: {
      name:"add",
      shortDescription:"Create a new module",
      description: "Create a new module with all necessary code templates",
      parameters: {
        dest: {
          name        : "dest"                                                                        ,
          description : "Destination folder to create files in. By default, '.' is the target folder" ,
          required    : false                                                                         ,
          type        : "string",
          exemples : [
            ".",
            "./destinationFolder"
          ]
        }
      }
    },
    get: {
      name:"get",
      shortDescription : "retreive one or more module from a repository or cache" ,
      description:"Retreive one or more modules from a repository.",
      usages:[
        `nc module get list=com.nucleus-websocket,com.nucleus-upload`,
        `nc module get catalog=react`
      ],
      parameters:{
        list: {
          name        : "list"                                                              ,
          description : "List of all module to retreive, coma separated, without any space" ,
          type        : "String"                                                            ,
          required    : false                                                               ,
          exemples:[
            `com.nucleus-websocket,com.nucleus-upload`,
            `com.nucleus-websocket`
          ]
        },
        catalog: {
          name        : "catalog"                                                   ,
          description : "Get all packages previously saved in a local catalog list" ,
          type        : "String"                                                    ,
          required    : false                                                       ,
          exemples:[
            `create-react-app`,
          ]
        }
      }
    },
    init: {
      description:"init a new project",
      name:"init"
    }
  }
} as Partial<Package>;

export const _package = {
  name             : "package"                                                                                  ,
  shortDescription : "All package actions available"                                                            ,
  description      : "The package <package> handle all installed packages, new installation, update and delete" ,
  commands: {
    list: {
      name             : "list"                                                ,
      description      : "List all packages installed / and locally available" ,
      shortDescription : "List all packages available"                         ,
      usages:[
        "nc package list"
      ],
      exemples: [
        "nc package list"
      ]
    }
  }
} as Partial<Package>;

export const AppDoc = {
  name    : "Nucleus" ,
  appName : "nc"      ,
  version : "1.0.0"   ,
  shortDescription:"Plugin based architecture for frontend and backend",
} as App;
