"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const pth = __importStar(require("path"));
function execSync(command) {
    return require("child_process").execSync(command);
}
exports.execSync = execSync;
function existsSync(path) {
    return fs.existsSync(path);
}
exports.existsSync = existsSync;
function mkDirSync(source) {
    console.log("IO : ", source);
    fs.mkdirSync(source, { recursive: true });
    return;
    var sourceTab = (source).replace(/\\\\/g, "/").split("/");
    sourceTab.reduce((previous, current) => {
        let path = (`${previous}`);
        previous && (current = `${previous}/${current}`);
        !fs.existsSync(path) && fs.mkdirSync(path);
        path = (`${current}`);
        !fs.existsSync(path) && fs.mkdirSync(path);
        return current;
    });
    if (sourceTab.length === 1) {
        !fs.existsSync(source) && fs.mkdirSync((source));
    }
}
exports.mkDirSync = mkDirSync;
function renameSync(source, dest) {
    fs.renameSync(source, dest);
}
exports.renameSync = renameSync;
function copySync(source, target) {
    let path = `${source}`;
    let files = [];
    let dirs = [];
    if (fs.lstatSync(path).isDirectory()) {
        fs.existsSync(`${path}`) && fs.readdirSync(path).forEach(item => {
            if (fs.lstatSync(`${source}/${item}`).isFile()) {
                files.push(item);
            }
            else if (fs.lstatSync(`${source}/${item}`).isDirectory()) {
                dirs.push(item);
            }
        });
    }
    else {
        files.push(path);
    }
    files.forEach(file => {
        mkDirSync(target);
        const isDir = fs.lstatSync(path).isDirectory();
        if (isDir) {
            fs.copyFileSync(`${source}/${file}`, `${target}/${file}`);
        }
        else {
            fs.copyFileSync(`${file}`, `${target}/${pth.basename(file)}`);
        }
    });
    dirs.forEach(dir => {
        mkDirSync(`${target}/${dir}`);
        copySync(`${source}/${dir}`, `${target}/${dir}`);
    });
}
exports.copySync = copySync;
function rmDirSync(source) {
    let path = `${source}`;
    let files = [];
    let dirs = [];
    fs.existsSync(`${source}`) && fs.readdirSync(path).forEach(item => {
        if (fs.lstatSync(`${source}/${item}`).isFile()) {
            files.push(item);
        }
        else if (fs.lstatSync(`${source}/${item}`).isDirectory()) {
            dirs.push(item);
        }
    });
    files.forEach(file => {
        fs.unlinkSync(`${source}/${file}`);
    });
    dirs.forEach(dir => {
        rmDirSync(`${source}/${dir}`);
    });
    fs.existsSync(`${source}`) && fs.rmdirSync(`${source}`);
}
exports.rmDirSync = rmDirSync;
//# sourceMappingURL=IO.js.map