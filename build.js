const execSync = require("child_process").execSync;
const fs = require("fs");

const modules = [
  ["Nucleus.js","nucleus.node.js","node"],
  ["Nucleus.js","nucleus.web.js","web"],
  ["modules/logging/front/LoggingConsole.js","logging.web.js","web"],
  ["modules/logging/front/LoggingConsole.js","logging.node.js","node"]
];

for(var i = 0; i < modules.length; i++) {
  const command = `webpack --entry ./out/${modules[i][0]} --output ./dist/${modules[i][1]} --target ${modules[i][2]}`;
  execSync(command);
  console.log(command);
}

fs.copyFileSync("./assets/modules.conf.node.json", "./dist/modules.conf.node.json");
console.log("Copy ./dist/modules.conf.node.json");

fs.copyFileSync("./assets/modules.conf.web.json", "./dist/modules.conf.web.json");
console.log("Copy ./dist/modules.conf.web.json");

console.log("Done !");
