var {copySync, mkDirSync, rmDirSync} = require("./tools");
var path = require("path");
const execSync = require("child_process").execSync;
const fs = require("fs");

rmDirSync("./dist");

console.log(`tsc --experimentalDecorators -p ${path.resolve(".")}`);
console.log(execSync(`tsc`).toString());
console.log("Compile project");

const modules = [
  ["Nucleus.js","nucleus.node.js","node"],
  ["Nucleus.js","nucleus.web.js","web"],
  ["BootNode.js","nucleus.bootNode.js","node"],
  ["BootWeb.js","nucleus.bootWeb.js","web"],
  ["modules/logging/front/LoggingConsole.js","nc-logging/1.0.0/front/nc-logging.js","web"],
  ["modules/logging/front/LoggingConsole.js","nc-logging/1.0.0/back/nc-logging.js","node"],
  ["modules/cli/back/Cli.js","nc-cli/1.0.0/back/nc-cli.js","node"],
  ["modules/typescript/back/Entrypoint.js","typescript/3.3.3/back/typescript.js","node"],
  ["modules/webpack/back/Entrypoint.js","webpack/4.29.6/back/webpack.js","node"]
];

mkDirSync("./dist");
mkDirSync("./dist/_packages");
mkDirSync("./dist/_packages/modules");
mkDirSync("./dist/_packages/modules/conf");

copySync("./out", "./dist");

for(var i = 0; i < modules.length; i++) {
  const command = `yarn webpack --entry ./out/${modules[i][0]} --output ./dist/_packages/modules/${modules[i][1]} --target ${modules[i][2]}`;
  execSync(command);
  console.log(command);
}

fs.copyFileSync("./assets/modules.conf.node.json", "./dist/_packages/modules/conf/modules.conf.node.json");
console.log("Copy ./dist/modules.conf.node.json");

fs.copyFileSync("./assets/modules.conf.web.json", "./dist/_packages/modules/conf/modules.conf.web.json");
console.log("Copy ./dist/modules.conf.web.json");

console.log("Done !");
