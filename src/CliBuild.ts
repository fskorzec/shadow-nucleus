#!/usr/bin/env node
import * as tools from "../scripts/tools";

const params = process.argv;
params.shift();
params.shift();

const modulePath = params.shift();
const moduleName = params.shift();
const targetPath = params.shift();
const version    = params.shift();
const targetMode = params.shift();

console.log(tools.execSync(`tsc ./${modulePath}/${moduleName}.ts ./out/${targetPath}`).toString());
console.log(tools.execSync(`yarn webpack --entry ./out/${targetPath}/${moduleName}.js --output ./dist/${moduleName}/${version}/${targetMode === "web" ? "front" : "back"}/${moduleName}.js --target ${targetMode}`).toString());
