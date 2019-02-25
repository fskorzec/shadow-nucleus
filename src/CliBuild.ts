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

try {

  let mdPath = `./${modulePath}/${moduleName}.ts`;
  let jsx = "";
  
  if (tools.existsSync(`${mdPath}x`)) {
    mdPath += "x";
    jsx = "--jsx react";
  }
  
  console.log(tools.execSync(`tsc ${mdPath} --outdir ./out/${targetPath} --target es6 --module commonjs ${jsx}`).toString());
  console.log(tools.execSync(`yarn webpack --entry ./out/${targetPath}/${moduleName}.js --output ./dist/${moduleName}/${version}/${targetMode === "web" ? "front" : "back"}/${moduleName}.js --target ${targetMode}`).toString());
} catch(ex) {
  console.log(ex);
  console.log("Usage : yarn nc-build modulePath moduleName targetPath version targetMode");
}
