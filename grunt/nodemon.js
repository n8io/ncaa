module.exports = {
  dev: {
    script: 'app.js',
    options : {
      cwd: '<%= cfg.nodemon.cwd %>',
      nodeArgs: ['--debug=' + '<%= cfg.nodemon.debugPort %>'],
      watch: '<%= cfg.nodemon.watch %>',
      ext: 'js,json'
    }
  },
};