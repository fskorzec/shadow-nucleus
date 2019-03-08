import { Terminal } from "./console/Terminal";
import { IColor16Terminal } from "./console/core/Constant";
import { prepareCliArguments, CommandArgs } from "./console/Args";
import { App, Package } from "./console/TPackages";

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
    build: {
      name:"module",
      description:"All modules related actions",
      commands: {
        module: {
          name:"build",
          shortDescription:"Build a module",
          parameters:{
            moduleName: {
              name:"moduleName",
              required: true
            }
          }

        }
      }
    }
  }
} as App;

function processParams(params: CommandArgs) {
  if (params.package === "help") {
    renderGlobalinformatiom();
  }
}

function renderGlobalinformatiom() {
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
    .newLine()
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
  .write();

  term.text("Retreiving module : com.nucleus / Upload ")
  .bgLightGray(" ")
  .bgDarkGray("          ")
  .bgLightGray(" ")
  .leftBy(11)
  .bgGreen("      ")
  .rightBy(6)
  .text("[ 20% ]")
  .write();

  term.text("Retreiving module : com.nucleus / Upload ")
  .bgLightGray(" ")
  .bgDarkGray("          ")
  .bgLightGray(" ")
  .saveCursorPosition()
  .leftBy(11)
  .bgGreen("    ")
  .restoreCursorPosition()
  .rightBy(1)
  .text("[ 30% ]")
  .write();
  
}

processParams(params);