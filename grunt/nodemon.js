var cwd = require('cwd');
var pkgJson = require(cwd('package.json'));

module.exports = {
  dev: {
    script: cwd(pkgJson.main),
    options : {
      nodeArgs: ['--debug=' + '<%= cfg.nodemon.debugPort %>'],
      watch: '<%= cfg.nodemon.watch %>',
      ext: 'js,json'
    }
  },
};
