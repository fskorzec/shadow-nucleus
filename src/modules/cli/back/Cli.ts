import { Evts }                     from "./Events"                   ;
import { CommandArgs }              from "../../../console/Args"      ;
import { Package, Command }         from "../../../console/TPackages" ;
import { module, AppDoc, _package } from "././doc/Module"             ;
import * as fs from "fs";

import { 
  IModuleEntryPoint , 
  IApi              , 
  connect           ,
  BaseComponent
} from "../../../Plugin";
import { Terminal } from "../../../console/Terminal";
import { Color16, EStyle, ForeColor, EscColorClosingChar } from "../../../console/core/Constant";
import { Build } from "./runner/Build";
import { IPrivateBaseComponent, TSendQuery } from "../../../core/BaseComponent";
import { CLI_IDENTITY } from "../../../core/constant/Cli";
import { New } from "./runner/New";
import { buildQueryResult } from "../../../core/util/Event";
import { Guid } from "../../../shared/text/Guid";

import * as IO from "../../../utils/IO";
import { fstat } from "fs";

const term = new Terminal();

let _packages: {
  [index: string]: CLI_PACKAGE
} = {};

export default class Cli implements IModuleEntryPoint {

  async entryPoint(api: IApi): Promise<void> {
    const cmp = await api.Service.resolve<IPrivateBaseComponent>(BaseComponent);

    cmp._Receive<CLI_PACKAGE>(Evts.CLI.PACKAGE.REGISTER, (data) => {
      _packages[data.payload.doc.name || ""] = data.payload;
      cmp._Send(Evts.CLI.PACKAGE.REGISTERED, data);
    });

    cmp._Receive<CommandArgs>(Evts.CLI.RUNNER.EXECUTE, async (data) => {
      await processParams(data.payload);
    });

    cmp._SendSync<CLI_PACKAGE>(Evts.CLI.PACKAGE.REGISTER, {
      sender: CLI_IDENTITY,
      payload: {
        doc: module,
        runner: (async function (this: BaseComponent ,params: CommandArgs) {
          switch(params.command) {
            case "init":
              console.log("Initialize a new project");
              const res = await cmp._SendWithReturn<any, any>("CLI.ENV.GET_INFO", "CLI.ENV.INFO_GOTTEN", {
                sender: this.identity,
                payload: {
                  guid: Guid.getGuid()
                }
              });
              
              IO.mkDirSync(`${res.payload.callerPath}/nc-repo`);
              IO.mkDirSync(`${res.payload.callerPath}/nc-bin`);
              IO.mkDirSync(`${res.payload.callerPath}/nc-dist`);
              term.write();
              /*const slnName = await term.getNextInput("Solution name : ");
              const version = await term.getNextInput("Version (1.0.0): ");

              const password =  await term.getNextInput("password: ", true);*/

              const choice = await term.getNextinputChoice([
                "Choice 1",
                "Choice 2",
                "Choice 3",
              ]);

             /* fs.writeFileSync(`${res.payload.callerPath}/nc.sln.json`, `
{
  "name": "${slnName.trim()}",
  "version": "${version.trim()}"
}
`, "utf8");*/
              term.newLine().write(`You chose ${choice+1}`);

              const choice2 = await term.getNextinputChoice([
                "Choice 1",
                "Choice 2",
                "Choice 3",
                "Choice 4",
                "Choice 5",
              ]);
              
              term.newLine().write(`You chose ${choice2+1}`).newLine().write();

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
              
              return;
            case "build":
            let {mod, target} = params.parameters;

            mod = mod || "";
            target = (target !== "front" && target !== "back") ? "front" : target;

            Build.buildModule.call(this, mod, <"front" | "back">target);
            break;
            case "new":
              let {name, path} = params.parameters;
              New.newModule.call(this, {moduleName: name, modulePath: path})
            break;
          }
        }).bind(cmp as unknown as BaseComponent)
      }
    });

    cmp._SendSync<CLI_PACKAGE>(Evts.CLI.PACKAGE.REGISTER, {
      sender: CLI_IDENTITY,
      payload: {
        doc: _package,
        runner: async (params: CommandArgs) => {
          if (params.command === "list") {
            renderPackageList();
          }
        }
      }
    });

  }
}

connect(Cli);

async function processParams(params: CommandArgs) {
  renderHeader();  
  if (params.package === "help") {
    renderGlobalinformatiom();
  } else {
    switch(params.package) {
      default:
        if (params.package in _packages) {
          const pck = _packages[params.package].doc;
          if (params.command === "help") {
            renderPackage(pck);
          } else {
            const cmd = params.command;
            if (params.parameters && "help" in params.parameters) {
              if (pck.commands && pck.commands[cmd]) {
                renderCommand(pck, pck.commands[cmd]);
              } else {
                term
                .red(`Command <${cmd}> not found in package <${pck.name}>`)
                .newLine()
                .write();
              }
            } else {
              if (pck.commands && pck.commands[cmd]) {
                if (_packages[params.package].runner && typeof _packages[params.package].runner === "function") {
                  _packages[params.package].runner(params);
                } else {
                  term.red(`No runner found to execute the following configuration ${JSON.stringify(params, null, 2)}`).newLine().write();
                }
              } else {
                term
                .red(`Command <${cmd}> not found in package <${pck.name}>`)
                .newLine()
                .newLine()
                .write();
                renderGlobalinformatiom();
              }
            }
          }
        } else {
          term.red(`Package named <${params.package}> was not found.`)
          .newLine()
          .newLine()
          .write();
          renderGlobalinformatiom();
        }
      break;
      /*
      case "module": 
      if (params.command === "get") {
        if ("help" in params.parameters) {
          renderHeader().newLine().write();
          const commands = _packages[params.package].doc.commands;
          if (commands && params.command in commands) {
            renderCommand(commands[params.command]).newLine().write();
          }
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
      */
    }
  }
}

function renderCommand(pkg: Package, command: Command) {
  term.lightCyan(" Command : ").lightGreen(command.name)
  .newLine()
  .text(" ")
  .darkGray(command.description)
  .newLine()
  .drawLine("-")
  .newLine()
  .write();

  term
  .newLine()
  .text(" ")
  .drawColoredText("Usage :", ForeColor[Color16.lightGray], void 0, EStyle.underline)
  .newLine()
  .newLine()
  .text(" ")
  .text(AppDoc.appName).text(" ").lightBlue(pkg.name).text(" ").lightBlue(command.name)
  .write()

  if (command.parameters) {
    term.lightGray(` [<`).lightBlue(`parameter`).lightGray(`> [...<`).lightBlue(`parameter`).lightGray(`>]]`)
    .newLine()
    .write();
  }
  
  if (command.parameters) {
    term
    .newLine()
    .drawLine("-")
    .newLine()
    .lightCyan(" Parameters")
    .newLine()
    .write();
  }

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
    .newLine()
    .text(" ")
    .yellow(i)
    .rightBy(maxL - i.length +1) 
    .text(" - ")
    .darkGray(command.parameters[i].description)
    .newLine()
    .write();

    if (command.parameters[i].exemples) {
      term
      .newLine()
      .text(" ")
      .drawColoredText("Examples :", void 0, void 0, EStyle.underline)
      .newLine()
      .newLine()
      .write()
      
      for(let j of (command as any).parameters[i].exemples) {
        term.lightGray(` ${AppDoc.appName} `).lightBlue(`${pkg.name}`).lightGray(` `).lightBlue(`${command.name}`).lightGray(` `)
        .yellow(`${command.parameters[i].name}`).lightGray("=")
        .drawColoredText(j, ForeColor[Color16.lightCyan], void 0, EStyle.bold)
        .newLine()
        .write();
      }
    }
  }

  return term;
}

function renderPackageList() {
  term.write();
  term.darkGray(" List of all packages currently installed")
  .newLine()
  .drawLine("-")
  .newLine()
  .write();
  let maxL = 0;

  for(let i in _packages) {
    if (maxL < i.length) {
      maxL = i.length;
    }
  }

  for(let i in _packages) {
    term
    .text(" ")
    .yellow(i)
    .rightBy(maxL - i.length +1) 
    .text(" - ")
    .darkGray(_packages[i].doc.shortDescription)
    .newLine()
    .write();
  }

}

function renderHeader() {
  term
  .newLine()
  .lightCyan(`  _   _               _                    `)       .newLine()
  .lightCyan(` | \\ | |             | |                   `)      .newLine()
  .lightCyan(` |  \\| | _   _   ___ | |  ___  _   _  ___  `)      .newLine()
  .lightCyan(` | . ' || | | | / __|| | / _ \\| | | |/ __| `)      .newLine()
  .lightCyan(` | |\\  || |_| || (__ | ||  __/| |_| |\\__ \\ `)    .newLine()
  .lightCyan(` \\_| \\_/ \\__,_| \\___||_| \\___| \\__,_||___/ `) .newLine()
  .lightMagenta(` Version ${AppDoc.version}`).newLine()
  .newLine()
  .green(" " + AppDoc.shortDescription)
  .newLine()
  .drawLine("-")
  .newLine()
  .write();

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
    const pct10 = (pct - (pct % 10)) / 10;
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

function renderPackage(pck: Package) {
  term.lightCyan(" Package : ").lightGreen(pck.name)
  .newLine()
  .text(" ")
  .darkGray(pck.description)
  .newLine()
  .drawLine("-")
  .newLine()
  .write();

  let maxL = 0;

  for(let i in pck.commands) {
    if (maxL < i.length) {
      maxL = i.length;
    }
  }

  if (maxL > 0) {
    term
    .newLine()
    .text(" ")
    .drawColoredText("List of commands :", ForeColor[Color16.lightGray], void 0, EStyle.underline)
    .newLine()
    .newLine()
    .write();
  }

  for(let i in pck.commands) {
    term
    .text(" ")
    .yellow(i)
    .rightBy(maxL - i.length +1) 
    .text(" - ")
    .darkGray(pck.commands[i].shortDescription)
    .newLine()
    .write();
  }

  term
  .newLine()
  .write();

  term
  .text(" ")
  .drawColoredText("Usages :", ForeColor[Color16.lightGray], void 0, EStyle.underline)
  .newLine()
  .newLine()
  .text(` ${AppDoc.appName} `).lightBlue(`${pck.name}`).lightGray(` <`).lightBlue(`command`).lightGray(`> [<`).lightBlue(`parameter`).lightGray(`> [...<`).lightBlue(`parameter`).lightGray(`>]]`)
  .newLine()
  .text(` ${AppDoc.appName} `).lightBlue(`${pck.name}`).lightGray(` <`).lightBlue(`command`).lightGray(`> `).lightBlue(`help`).lightGray(` to get more help`)
  .newLine()
  .write()

  if (pck.exemples) {
    term
    .drawLine("-")
    .newLine()
    .text(" Examples :")
    .drawLine("-")
    .newLine()
    .write();

    for(let i of pck.exemples) {
      term.yellow(i).newLine().write();
    }
  }
}

function renderGlobalinformatiom() {
  term.darkGray(` Global usage : `)
  .lightGray(` ${AppDoc.appName} <`).lightBlue(`package`).lightGray(`> <`).lightBlue(`command`).lightGray(`> [<`).lightBlue(`argument`).lightGray(`> | <`).lightBlue(`argument`).lightGray(`=`).lightBlue(`value`).lightGray(`> [...]]`)
  .newLine()
  .newLine()
  .darkGray(` For more information you can type :`)
  .newLine()
  .newLine()
  .lightGray(` ${AppDoc.appName} <`).lightBlue(`package`).lightGray(`> `).lightBlue(`help`).lightGray(` to get package help`).newLine()
  .lightGray(` ${AppDoc.appName} <`).lightBlue(`package`).lightGray(`> <`).lightBlue(`command`).lightGray(`> `).lightBlue(`help`).lightGray(` to get command help`).newLine()
  .lightGray(` ${AppDoc.appName} `).lightBlue(`package`).lightGray(` `).lightBlue(`list`).lightGray(` to get all package names`)
  .newLine()
  .write();
}

type CLI_PACKAGE = {
  runner: (args: CommandArgs) => void;
  doc: Package;
}