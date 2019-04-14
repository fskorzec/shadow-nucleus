import * as fs  from "fs"   ;
import * as pth from "path" ;

function execSync(command: string) {
  return require("child_process").execSync(command);
}

function existsSync(path: string) {
  return fs.existsSync(path);
}

function mkDirSync(source: string) {
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

function renameSync(source: string, dest: string) {
  fs.renameSync(source, dest);
}

function copySync(source: string, target: string) {
  let path  = `${source}` ;
  let files : Array<string> = [];
  let dirs  : Array<string> = [];
  
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

function rmDirSync(source: string) {
  let path  = `${source}` ;
  let files : Array<string> = [];
  let dirs  : Array<string> = [];

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

export {
  mkDirSync  ,
  copySync   , 
  rmDirSync  , 
  renameSync ,
  execSync   ,
  existsSync 
};
