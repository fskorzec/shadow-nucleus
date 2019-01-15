var fs = require("fs");
var pth = require("path");

function execSync(command) {
  return require("child_process").execSync(command);
}

function mkDirSync(source) {
  var sourceTab = source.replace(/\\\\/g, "/").split("/");
  sourceTab.reduce( (previous, current) => {
    let path = `${previous}`;
    previous && (current = `${previous}/${current}`);
    !fs.existsSync(path) && fs.mkdirSync(path);
    path = `${current}`;
    !fs.existsSync(path) && fs.mkdirSync(path);
    return current;
  });

  if (sourceTab.length === 1) {
    !fs.existsSync(source) && fs.mkdirSync(source);
  }
}

function renameSync(source, dest) {
  fs.renameSync(source, dest);
}

function copySync(source, target) {
  let path  = `${source}` ;
  let files = []          ;
  let dirs  = []          ;

  
  if (fs.lstatSync(path).isDirectory()) {
    fs.existsSync(`${path}`) && fs.readdirSync(path).forEach( item => {
      if (fs.lstatSync(`${source}/${item}`).isFile()) {
        files.push(item);
      } else if (fs.lstatSync(`${source}/${item}`).isDirectory()) {
        dirs.push(item);
      }
    });
  } 
  else 
  {
    files.push(path);
  }
  console.log(files, dirs)
  
  files.forEach(file => {
    mkDirSync(target);
    const isDir = fs.lstatSync(path).isDirectory();

    if (isDir) {
      fs.copyFileSync(`${source}/${file}`, `${target}/${file}`);
    } else {
      fs.copyFileSync(`${file}`, `${target}/${pth.basename(file)}`);
    }
  });


  dirs.forEach( dir => {
    mkDirSync(`${target}/${dir}`);
    copySync(`${source}/${dir}`, `${target}/${dir}`);
  });
}

function rmDirSync(source) {
  let path  = `${source}` ;
  let files = []          ;
  let dirs  = []          ;

  fs.existsSync(`${source}`) && fs.readdirSync(path).forEach( item => {
    if (fs.lstatSync(`${source}/${item}`).isFile()) {
      files.push(item);
    } else if (fs.lstatSync(`${source}/${item}`).isDirectory()) {
      dirs.push(item);
    }
  });

  files.forEach( file => {
    fs.unlinkSync(`${source}/${file}`);
  });

  dirs.forEach( dir => {
    rmDirSync(`${source}/${dir}`);
  });

  fs.existsSync(`${source}`) && fs.rmdirSync(`${source}`);
}

module.exports = {
  mkDirSync  ,
  copySync   , 
  rmDirSync  , 
  renameSync ,
  execSync
};
