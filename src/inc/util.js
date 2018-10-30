var fs = require('fs');
var path = require('path');

// Returns an array of folders in the source directory...
function foldersIn (source) {
  return fs.readdirSync(source).map(name => path.join(source, name)).filter( source => fs.lstatSync(source).isDirectory() );
}

// Returns an array of files in the source directory...
function filesIn (source) {
  return fs.readdirSync(source).map(name => path.join(source, name)).filter( source => fs.lstatSync(source).isFile() );
}

// Returns an array of files and folders and sockets and symbolic links in the soruce directory...
function stuffIn (source) {
  return fs.readdirSync(source).map(name => path.join(source, name));
}

function exists (path) {
  if (fs.existsSync(path)) return true
  return false
}

// Checks if item exists with any basepaths...
function anyExists (paths, names, item) {
  let ret = {path: false, source: names[2]}
  paths.forEach((loc, index) => {
    let checkPath = path.resolve(loc + item)
    if (exists(checkPath)) {
      ret = {path: checkPath, source: names[index]}
    }
  })
  return ret
}

// Safely attempt something, can also call something when done...
function tryIt (fn, cb) {
  var err;
  try { fn(); } catch (e) { err = e; }
  if (cb) cb(err || null);
}

// Returns true if the main module (index), otherwise returns false (you're in node_modules)
function main() {
  return require.main === module
}

// Returns the path of the root project folder
function root() {
  return path.dirname(require.main.filename);
}

// Returns package.json from the root project if it exists.
function pjson() {
  var contents = fs.readFileSync(root() + '/package.json');  
  if (contents) {
    contents = JSON.parse(contents);
  }
  return contents || {}
}

module.exports = {
  foldersIn: foldersIn,
  filesIn: filesIn,
  stuffIn: stuffIn,
  try: tryIt,
  main: main,
  root: root,
  exists: exists,
  anyExists: anyExists,
  join: path.join,
  basename: path.basename,
  resolve: path.resolve,
  pjson: pjson,
  fileName: (name) => path.parse(name).name,
  fileExt: (name) => path.parse(name).ext,
  logo: () => { console.log('Reactor'); }
};