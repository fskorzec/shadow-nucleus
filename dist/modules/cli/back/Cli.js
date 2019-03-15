"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("./Events");
const Module_1 = require("././doc/Module");
const Plugin_1 = require("../../../Plugin");
const Terminal_1 = require("../../../console/Terminal");
const term = new Terminal_1.Terminal();
let _packages = {};
class Cli {
    entryPoint(api) {
        return __awaiter(this, void 0, void 0, function* () {
            const cmp = yield api.Service.resolve(Plugin_1.BaseComponent);
            cmp["_Receive"](Events_1.Evts.CLI.PACKAGE.REGISTER, (data) => {
                _packages[data.payload.doc.name || ""] = data.payload;
                cmp["_send"](Events_1.Evts.CLI.PACKAGE.REGISTERED, data);
            });
            cmp["_Receive"](Events_1.Evts.CLI.RUNNER.EXECUTE, (data) => {
                processParams(data.payload);
            });
            cmp["_sendSync"](Events_1.Evts.CLI.PACKAGE.REGISTER, {
                sender: cmp.identity,
                payload: {
                    doc: Module_1.module,
                    runner: () => void 0
                }
            });
            cmp["_sendSync"](Events_1.Evts.CLI.PACKAGE.REGISTER, {
                sender: cmp.identity,
                payload: {
                    doc: Module_1._package,
                    runner: (params) => {
                        if (params.command === "list") {
                            renderPackageList();
                        }
                    }
                }
            });
        });
    }
}
exports.default = Cli;
Plugin_1.connect(Cli);
function processParams(params) {
    renderHeader();
    if (params.package === "help") {
        renderGlobalinformatiom();
    }
    else {
        switch (params.package) {
            default:
                if (params.package in _packages) {
                    const pck = _packages[params.package].doc;
                    if (params.command === "help") {
                        renderPackage(pck);
                    }
                    else {
                        const cmd = params.command;
                        if (params.parameters && "help" in params.parameters) {
                            // render command
                        }
                        else {
                            if (_packages[params.package].runner) {
                                _packages[params.package].runner(params);
                            }
                            else {
                                term.red(`No runner found to execute the following ${JSON.stringify(params, null, 2)}`);
                            }
                        }
                    }
                }
                else {
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
function renderCommand(command) {
    term.text("Command : ").red(command.name)
        .newLine()
        .text(command.description)
        .newLine();
    term
        .drawLine("-")
        .newLine()
        .text("Usages ")
        .newLine();
    for (let i of command.usages) {
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
    for (let i in command.parameters) {
        if (maxL < i.length) {
            maxL = i.length;
        }
    }
    for (let i in command.parameters) {
        term
            .drawLine("-")
            .newLine()
            .yellow(i)
            .rightBy(maxL - i.length + 1)
            .text(" - ")
            .text(command.parameters[i].description)
            .newLine()
            .write();
        term
            .newLine()
            .text("Exemples ")
            .newLine();
        for (let j of command.parameters[i].exemples) {
            term.text(j).newLine().write();
        }
    }
    return term;
}
function renderPackageList() {
    term.write();
    term.text("List of all packages currently installed")
        .newLine()
        .drawLine("-")
        .newLine()
        .write();
    let maxL = 0;
    for (let i in _packages) {
        if (maxL < i.length) {
            maxL = i.length;
        }
    }
    for (let i in _packages) {
        term
            .yellow(i)
            .rightBy(maxL - i.length + 1)
            .text(" - ")
            .text(_packages[i].doc.shortDescription)
            .newLine()
            .write();
    }
}
function renderHeader() {
    term
        .text("Application ")
        .red(Module_1.AppDoc.name)
        .text(" version ")
        .yellow(Module_1.AppDoc.version)
        .newLine()
        .newLine()
        .green(Module_1.AppDoc.shortDescription)
        .newLine()
        .drawLine("-")
        .newLine();
    return term;
}
function drawLineDL(file) {
    while (file.length < 50) {
        file += " ";
    }
    return new Promise((r, x) => {
        let pct = 1;
        const id = setInterval(() => {
            pct += 3;
            const pct10 = (pct - (pct % 10)) / 10;
            let progress = "";
            let rest = "";
            for (let i = 0; i < pct10; i++) {
                progress += " ";
            }
            for (let i = pct10; i < 10; i++) {
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
                .restoreCursorPosition();
        }, 20);
    });
}
function renderPackage(pck) {
    term.text("Package : ").yellow(pck.name)
        .newLine()
        .text(pck.description)
        .newLine()
        .drawLine("-")
        .newLine()
        .write();
    let maxL = 0;
    for (let i in pck.commands) {
        if (maxL < i.length) {
            maxL = i.length;
        }
    }
    for (let i in pck.commands) {
        term
            .yellow(i)
            .rightBy(maxL - i.length + 1)
            .text(" - ")
            .text(pck.commands[i].shortDescription)
            .newLine()
            .write();
    }
    term
        .newLine()
        .write();
    if (pck.exemples) {
        term
            .drawLine("-")
            .newLine()
            .text("Examples :")
            .drawLine("-")
            .newLine()
            .write();
        for (let i of pck.exemples) {
            term.yellow(i).newLine().write();
        }
    }
}
function renderGlobalinformatiom() {
    term.darkGray(`Global usage : `)
        .lightGray(`${Module_1.AppDoc.appName} <package> <command> [<argument> | <argument=value> [...]]`)
        .newLine()
        .newLine()
        .text(`For more information you can type :
  ${Module_1.AppDoc.appName} <package> help to get package help
  ${Module_1.AppDoc.appName} <package> <command> help to get command help
  ${Module_1.AppDoc.appName} package list to get all package names
  `)
        .newLine()
        .write();
}
//# sourceMappingURL=Cli.js.map