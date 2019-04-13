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
const Constant_1 = require("../../../console/core/Constant");
const Build_1 = require("./runner/Build");
const Cli_1 = require("../../../core/constant/Cli");
const New_1 = require("./runner/New");
const term = new Terminal_1.Terminal();
let _packages = {};
class Cli {
    entryPoint(api) {
        return __awaiter(this, void 0, void 0, function* () {
            const cmp = yield api.Service.resolve(Plugin_1.BaseComponent);
            cmp._Receive(Events_1.Evts.CLI.PACKAGE.REGISTER, (data) => {
                _packages[data.payload.doc.name || ""] = data.payload;
                cmp._Send(Events_1.Evts.CLI.PACKAGE.REGISTERED, data);
                //console.log(`registering ${data.payload.doc.name}`)
            });
            cmp._Receive(Events_1.Evts.CLI.RUNNER.EXECUTE, (data) => __awaiter(this, void 0, void 0, function* () {
                yield processParams(data.payload);
            }));
            cmp._SendSync(Events_1.Evts.CLI.PACKAGE.REGISTER, {
                sender: Cli_1.CLI_IDENTITY,
                payload: {
                    doc: Module_1.module,
                    runner: (function (params) {
                        switch (params.command) {
                            case "build":
                                let { mod, target } = params.parameters;
                                mod = mod || "";
                                target = (target !== "front" && target !== "back") ? "front" : target;
                                Build_1.Build.buildModule.call(this, mod, target);
                                break;
                            case "new":
                                let { name, path } = params.parameters;
                                New_1.New.newModule.call(this, { moduleName: name, modulePath: path });
                                break;
                        }
                    }).bind(cmp)
                }
            });
            cmp._SendSync(Events_1.Evts.CLI.PACKAGE.REGISTER, {
                sender: Cli_1.CLI_IDENTITY,
                payload: {
                    doc: Module_1._package,
                    runner: (params) => __awaiter(this, void 0, void 0, function* () {
                        if (params.command === "list") {
                            renderPackageList();
                        }
                    })
                }
            });
        });
    }
}
exports.default = Cli;
Plugin_1.connect(Cli);
function processParams(params) {
    return __awaiter(this, void 0, void 0, function* () {
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
                                if (pck.commands && pck.commands[cmd]) {
                                    renderCommand(pck, pck.commands[cmd]);
                                }
                                else {
                                    term
                                        .red(`Command <${cmd}> not found in package <${pck.name}>`)
                                        .newLine()
                                        .write();
                                }
                            }
                            else {
                                if (pck.commands && pck.commands[cmd]) {
                                    if (_packages[params.package].runner && typeof _packages[params.package].runner === "function") {
                                        _packages[params.package].runner(params);
                                    }
                                    else {
                                        term.red(`No runner found to execute the following configuration ${JSON.stringify(params, null, 2)}`).newLine().write();
                                    }
                                }
                                else {
                                    term
                                        .red(`Command <${cmd}> not found in package <${pck.name}>`)
                                        .newLine()
                                        .newLine()
                                        .write();
                                    renderGlobalinformatiom();
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
    });
}
function renderCommand(pkg, command) {
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
        .drawColoredText("Usage :", Constant_1.ForeColor[Constant_1.Color16.lightGray], void 0, Constant_1.EStyle.underline)
        .newLine()
        .newLine()
        .text(" ")
        .text(Module_1.AppDoc.appName).text(" ").lightBlue(pkg.name).text(" ").lightBlue(command.name)
        .write();
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
    for (let i in command.parameters) {
        if (maxL < i.length) {
            maxL = i.length;
        }
    }
    for (let i in command.parameters) {
        term
            .drawLine("-")
            .newLine()
            .newLine()
            .text(" ")
            .yellow(i)
            .rightBy(maxL - i.length + 1)
            .text(" - ")
            .darkGray(command.parameters[i].description)
            .newLine()
            .write();
        if (command.parameters[i].exemples) {
            term
                .newLine()
                .text(" ")
                .drawColoredText("Examples :", void 0, void 0, Constant_1.EStyle.underline)
                .newLine()
                .newLine()
                .write();
            for (let j of command.parameters[i].exemples) {
                term.lightGray(` ${Module_1.AppDoc.appName} `).lightBlue(`${pkg.name}`).lightGray(` `).lightBlue(`${command.name}`).lightGray(` `)
                    .yellow(`${command.parameters[i].name}`).lightGray("=")
                    .drawColoredText(j, Constant_1.ForeColor[Constant_1.Color16.lightCyan], void 0, Constant_1.EStyle.bold)
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
    for (let i in _packages) {
        if (maxL < i.length) {
            maxL = i.length;
        }
    }
    for (let i in _packages) {
        term
            .text(" ")
            .yellow(i)
            .rightBy(maxL - i.length + 1)
            .text(" - ")
            .darkGray(_packages[i].doc.shortDescription)
            .newLine()
            .write();
    }
}
function renderHeader() {
    term
        .newLine()
        .lightCyan(`  _   _               _                    `).newLine()
        .lightCyan(` | \\ | |             | |                   `).newLine()
        .lightCyan(` |  \\| | _   _   ___ | |  ___  _   _  ___  `).newLine()
        .lightCyan(` | . ' || | | | / __|| | / _ \\| | | |/ __| `).newLine()
        .lightCyan(` | |\\  || |_| || (__ | ||  __/| |_| |\\__ \\ `).newLine()
        .lightCyan(` \\_| \\_/ \\__,_| \\___||_| \\___| \\__,_||___/ `).newLine()
        .lightMagenta(` Version ${Module_1.AppDoc.version}`).newLine()
        .newLine()
        .green(" " + Module_1.AppDoc.shortDescription)
        .newLine()
        .drawLine("-")
        .newLine()
        .write();
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
    term.lightCyan(" Package : ").lightGreen(pck.name)
        .newLine()
        .text(" ")
        .darkGray(pck.description)
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
    if (maxL > 0) {
        term
            .newLine()
            .text(" ")
            .drawColoredText("List of commands :", Constant_1.ForeColor[Constant_1.Color16.lightGray], void 0, Constant_1.EStyle.underline)
            .newLine()
            .newLine()
            .write();
    }
    for (let i in pck.commands) {
        term
            .text(" ")
            .yellow(i)
            .rightBy(maxL - i.length + 1)
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
        .drawColoredText("Usages :", Constant_1.ForeColor[Constant_1.Color16.lightGray], void 0, Constant_1.EStyle.underline)
        .newLine()
        .newLine()
        .text(` ${Module_1.AppDoc.appName} `).lightBlue(`${pck.name}`).lightGray(` <`).lightBlue(`command`).lightGray(`> [<`).lightBlue(`parameter`).lightGray(`> [...<`).lightBlue(`parameter`).lightGray(`>]]`)
        .newLine()
        .text(` ${Module_1.AppDoc.appName} `).lightBlue(`${pck.name}`).lightGray(` <`).lightBlue(`command`).lightGray(`> `).lightBlue(`help`).lightGray(` to get more help`)
        .newLine()
        .write();
    if (pck.exemples) {
        term
            .drawLine("-")
            .newLine()
            .text(" Examples :")
            .drawLine("-")
            .newLine()
            .write();
        for (let i of pck.exemples) {
            term.yellow(i).newLine().write();
        }
    }
}
function renderGlobalinformatiom() {
    term.darkGray(` Global usage : `)
        .lightGray(` ${Module_1.AppDoc.appName} <`).lightBlue(`package`).lightGray(`> <`).lightBlue(`command`).lightGray(`> [<`).lightBlue(`argument`).lightGray(`> | <`).lightBlue(`argument`).lightGray(`=`).lightBlue(`value`).lightGray(`> [...]]`)
        .newLine()
        .newLine()
        .darkGray(` For more information you can type :`)
        .newLine()
        .newLine()
        .lightGray(` ${Module_1.AppDoc.appName} <`).lightBlue(`package`).lightGray(`> `).lightBlue(`help`).lightGray(` to get package help`).newLine()
        .lightGray(` ${Module_1.AppDoc.appName} <`).lightBlue(`package`).lightGray(`> <`).lightBlue(`command`).lightGray(`> `).lightBlue(`help`).lightGray(` to get command help`).newLine()
        .lightGray(` ${Module_1.AppDoc.appName} `).lightBlue(`package`).lightGray(` `).lightBlue(`list`).lightGray(` to get all package names`)
        .newLine()
        .write();
}
//# sourceMappingURL=Cli.js.map