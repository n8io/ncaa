/*
  The Bower Component Parser is a module that parses the bower_components directory and tries
  to build out an array of necessary files automatically. Helps prevent you from listing out
  every file explicitly that you want moved to your statics directory.
*/
'use strict';

const fs = require(`fs`);
const path = require(`path`);
const cwd = require(`cwd`);
const _ = require(`lodash`);
const glob = require(`glob-all`);
const gutil = require(`gulp-util`);
const debug = require(`debug`)(`bower-component-parser`);

module.exports = (bcPath, projRoot) => {
  let files = [];
  let tFiles = [];
  let topLevelDirectories = [];
  let tPath = null;
  let fsObjs = [];
  let offsetDir = null;
  let bowerCfg = {};
  const distDirs = [
    `dist`,
    `min`,
    `lib`,
    `release`
  ];


  // Defaults
  if (!bcPath) {
    bowerCfg = JSON.parse(fs.readFileSync(cwd(`.bowerrc`), `utf-8`).toString());
    bcPath = cwd(bowerCfg.directory);
  }

  projRoot = projRoot || cwd();

  debug(`Bower components path: ${bcPath}`);
  debug(`Project root: ${projRoot}`);

  if (!fs.existsSync(bcPath)) {
    gutil.log(`No bower components installed. Nothing to do.`);

    return files;
  }
  offsetDir = path.relative(__dirname, projRoot);
  topLevelDirectories = getDirectories(bcPath);

  debug(`Offset dir: ${offsetDir}`);
  debug(`Top level directories:\n${JSON.stringify(topLevelDirectories, null, 2)}`);

  _.each(topLevelDirectories, (tld) => {
    tFiles = [];
    _.each(distDirs, (dir) => {
      tPath = path.join(bcPath, tld, dir, `**`);
      debug(`Checking dist dir: ${tPath}`);
      fsObjs = glob.sync(tPath);

      _.each(fsObjs, (f) => {
        if (fs.lstatSync(f).isDirectory()) {
          return;
        }

        tFiles.push(f);
      });
    });

    debug(`Found files at the dist directories? ${tFiles.length ? `Y` : `N`}`);

    if (!tFiles.length) {
      tFiles = glob.sync([
        // Since the tld doesn't have any specific buld dir, grab everything
        path.join(bcPath, tld, `**`),

        // Now pull out files that we know for sure are not to be available on the client
        `!${path.join(bcPath, tld, `**.json`)}`,
        `!${path.join(bcPath, tld, `**.md`)}`,
        `!${path.join(bcPath, tld, `**.log`)}`,
        `!${path.join(bcPath, tld, `**[._]spec*`)}`,
        `!${path.join(bcPath, tld, `**/test/**`)}`,
        `!${path.join(bcPath, tld, `**/coverage/**`)}`,
        `!${path.join(bcPath, tld, `LICENSE`)}`,
        `!${path.join(bcPath, tld, `*runtfile.js`)}`,
        `!${path.join(bcPath, tld, `**grunt.js`)}`,
        `!${path.join(bcPath, tld, `package.js`)}`,
        `!${path.join(bcPath, tld, `package.json`)}`,
        `!${path.join(bcPath, tld, `index.js`)}`
      ]);

      tFiles = _.reject(tFiles, (f) => fs.lstatSync(f).isDirectory());
    }

    files = files.concat(tFiles);
  });

  debug(`Found file list length: ${files.length}`);

  return files;

  function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter((file) => fs.statSync(path.join(srcpath, file)).isDirectory());
  }
};
