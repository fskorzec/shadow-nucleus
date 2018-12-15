#!/usr/bin/env node
import * as tools from "../scripts/tools";

const currentPath = __dirname;
const cwdPath = process.cwd();

tools.copySync(`${currentPath}/../scripts`,`${cwdPath}/nc-scripts`);
tools.copySync(`${currentPath}/../dist/_packages`,`${cwdPath}/nc-packages`);
console.log("done");