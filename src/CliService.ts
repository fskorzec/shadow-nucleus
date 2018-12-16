#!/usr/bin/env node
import * as tools from "../scripts/tools";
import { ADDRGETNETWORKPARAMS } from "dns";

const currentPath = __dirname;
const cwdPath = process.cwd();
const params = process.argv;
params.shift();
params.shift();

const modulePath = params.shift();
const moduleName = params.shift();

tools.copySync(`${currentPath}/../src/templates/Component.ts_txt`,`${cwdPath}/${modulePath}`);
tools.renameSync(`${cwdPath}/${modulePath}/Component.ts_txt`,`${cwdPath}/${modulePath}/${moduleName}.ts`);
console.log(`service ${moduleName} created`);