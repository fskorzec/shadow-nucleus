#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tools = __importStar(require("../scripts/tools"));
const currentPath = __dirname;
const cwdPath = process.cwd();
tools.copySync(`${currentPath}/../scripts`, `${cwdPath}/nc-scripts`);
tools.copySync(`${currentPath}/../dist/_packages`, `${cwdPath}/nc-packages`);
console.log("done");
//# sourceMappingURL=Cli.js.map