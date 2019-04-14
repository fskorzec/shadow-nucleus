#!/usr/bin/env node
import * as tools from "../scripts/tools";

const currentPath = __dirname;
const cwdPath = process.cwd();
const params = process.argv;
params.shift();
params.shift();

const modulePath = params.shift();
const moduleName = params.shift();

tools.copySync(`${currentPath}/../src/templates/ModuleEntryPoint.ts_txt`,`${cwdPath}/${modulePath}`);
tools.renameSync(`${cwdPath}/${modulePath}/ModuleEntryPoint.ts_txt`,`${cwdPath}/${modulePath}/${moduleName}.ts`);
console.log(`module ${moduleName} created`);