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

// Safely attempt something, can also call something when done...
function tryIt (fn, cb) {
  var err;
  try { fn(); } catch (e) { err = e; }
  if (cb) cb(err || null);
}

module.exports = {
  foldersIn: foldersIn,
  filesIn: filesIn,
  stuffIn: stuffIn,
  try: tryIt,
  join: path.join,
  basename: path.basename,
  fileName: (name) => path.parse(name).name,
  fileExt: (name) => path.parse(name).ext,
  logo: () => { console.log('Reactor'); }
};