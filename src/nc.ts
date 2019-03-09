import { Terminal } from "./console/Terminal";
import { IColor16Terminal } from "./console/core/Constant";
import { prepareCliArguments, CommandArgs } from "./console/Args";
import { App, Package, Command } from "./console/TPackages";
import { promises } from "fs";

const term = new Terminal();

const args =process.argv;
args.shift();
args.shift();

const params = prepareCliArguments(...args);

const AppDoc = {
  name:"Nucleus",
  appName:"nc",
  version:"1.0.0",
  shortDescription:"Plugin based architecture for front and backend",
  packages: {
    module: {
      name:"module",
      shortDescription:"All modules related actions",
      commands: {
        build: {
          name:"build",
          shortDescription:"Build a module",
          parameters:{
            moduleName: {
              name:"moduleName",
              required: true
            }
          }
        },
        get: {
          name:"get",
          description:"Retreive one or more modules from a repository.",
          usages:[
            `nc module get list=com.nucleus-websocket,com.nucleus-upload`,
            `nc module get catalog=react`
          ],
          parameters:{
            list: {
              name:"list",
              description:"List of all module to retreive, coma separated, without any space",
              type:"String",
              required: false,
              exemples:[
                `nc module get list=com.nucleus-websocket,com.nucleus-upload`,
                `nc module get list=com.nucleus-websocket`
              ]
            },
            catalog: {
              name:"catalog",
              description:"Get all packages previously saved in a local catalog list",
              type:"String",
              required: false,
              exemples:[
                `nc module get catalog=create-react-app`,
              ]
            }
          }
        }
      }
    },
    service:{
      name:"service",
      shortDescription:"All service related actions"
    },
    app:{
      name:"app",
      shortDescription:"Application management"
    },
    admin:{
      name:"admin",
      shortDescription:"Nucleus configuration and administration"
    }
  }
} as App;

function renderCommand(command: Command) {
  term.text("Command : ").red(command.name)
  .newLine()
  .text(command.description)
  .newLine()

  term
  .drawLine("-")
  .newLine()
  .text("Usages ")
  .newLine()

  for(let i of (command as any).usages) {
    term.text(i).newLine().write();
  }


  term
  .newLine()
  .drawLine("-")
  .newLine()
  .text("Parameters")
  .newLine()
  .write();

  

  let maxL = 0;

  for(let i in command.parameters) {
    if (maxL < i.length) {
      maxL = i.length;
    }
  }

  for(let i in command.parameters) {
    term
    .drawLine("-")
    .newLine()
    .yellow(i)
    .rightBy(maxL - i.length +1) 
    .text(" - ")
    .text(command.parameters[i].description)
    .newLine()
    .write();

    term
    .newLine()
    .text("Exemples ")
    .newLine()
  
    for(let j of (command as any).parameters[i].exemples) {
      term.text(j).newLine().write();
    }
  }



  return term;
}

function processParams(params: CommandArgs) {
  if (params.package === "help") {
    renderGlobalinformatiom();
  } else {
    switch(params.package) {
      case "package": 
        if (params.command === "list") {
          renderPackageList()
        }
      break;
      case "module": 
      if (params.command === "get") {
        if ("help" in params.parameters) {
          renderHeader().newLine().write();
          renderCommand((AppDoc as any).packages[params.package].commands[params.command]).newLine().write();
        } else {
          if ("catalog" in params.parameters) {
            renderHeader().newLine().write();
            term.text("Installing modules from catalog ").yellow(params.parameters.catalog).newLine().write();
            
            (async () => {
              term.drawLine("-").newLine().write();
              await drawLineDL("com.facebook - React");
              term.newLine().write();
              term.drawLine("-").newLine().write();
              await drawLineDL("com.facebook - React-Dom");
              term.newLine().write();
              term.drawLine("-").newLine().write();
              await drawLineDL("com.nucleus - Websocket");
              term.newLine().write();
              term.drawLine("-").newLine().write();
              await drawLineDL("com.nucleus - Upload");
              term.newLine().write();
              term.drawLine("-").newLine().write();
              await drawLineDL("com.nucleus - Hapi-Nes");
              term.newLine().write();
              term.drawLine("-").newLine().write();
              await drawLineDL("com.nucleus - Hapi");
              term.newLine().write();
              term.drawLine("-").newLine().write();
              await drawLineDL("com.nucleus - Material-UI");
              term.newLine().write();
              term.drawLine("-").newLine().write();
              await drawLineDL("com.nucleus - UI");
              term.newLine().write();
              term.drawLine("-").newLine().write();
              
              term.newLine().text("Catalog installed").write();
            })()

          }
        }
      }
      break;
    }
  }
}

function renderPackageList() {
  renderHeader();
  term.write();
  term.text("List of all packages currently installed")
  .newLine()
  .drawLine("-")
  .newLine()
  .write();
  let maxL = 0;

  for(let i in AppDoc.packages) {
    if (maxL < i.length) {
      maxL = i.length;
    }
  }

  for(let i in AppDoc.packages) {
    term
    .yellow(i)
    .rightBy(maxL - i.length +1) 
    .text(" - ")
    .text(AppDoc.packages[i].shortDescription)
    .newLine()
    .write();
  }

}

function renderHeader() {
  term
  .text("Application ")
  .red(AppDoc.name)
  .text(" version ")
  .yellow(AppDoc.version)
  .newLine()
  .newLine()
  .green(AppDoc.shortDescription)
  .newLine()
  .drawLine("-")
  .newLine();
  return term;
}

function drawLineDL(file: string) {
  while(file.length < 50) {
    file+=" ";
  }
  return new Promise((r,x) => {
    let pct = 1;
    const id = setInterval( () => {
    pct += 3;
    const pct10 = (pct - (pct%10)) / 10;
    let progress = "";
    let rest = "";
    
    for( let i = 0; i < pct10; i++) {
      progress += " ";
    }
    
    for( let i = pct10; i < 10; i++) {
      rest += " ";
    }

    if (pct >= 100) {
      clearInterval(id);
      pct = 100;
      r();
    }
    
    term
    .saveCursorPosition()
    .bgLightGray(" ")
    .bgGreen(progress)
    .bgDarkGray(rest)
    .bgLightGray(" ")
    .text(` [ ${pct}% ] `)
    .text(`Retreiving module : ${file} `)
    .write()
    .restoreCursorPosition()
    
  }, 20);
});
}

function renderGlobalinformatiom() {
    renderHeader()
    .darkGray(`Global usage : `)
    .lightGray(`${AppDoc.appName} <package> <command> [<argument> | <argument=value> [...]]`)
    .newLine()
    .newLine()
    .text(`For more information you can type :
  ${AppDoc.appName} <package> help to get package help
  ${AppDoc.appName} <package> help full to get full package help
  ${AppDoc.appName} <package> <command> help to get full command help
  ${AppDoc.appName} package list to get full package name list
  `)
  .write()
  .newLine();
}

processParams(params);
