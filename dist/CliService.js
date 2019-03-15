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
const params = process.argv;
params.shift();
params.shift();
const modulePath = params.shift();
const moduleName = params.shift();
tools.copySync(`${currentPath}/../src/templates/Component.ts_txt`, `${cwdPath}/${modulePath}`);
tools.renameSync(`${cwdPath}/${modulePath}/Component.ts_txt`, `${cwdPath}/${modulePath}/${moduleName}.ts`);
console.log(`service ${moduleName} created`);
//# sourceMappingURL=CliService.js.map