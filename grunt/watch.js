module.exports = {
  css: {
    files: '<%= cfg.watch.css.files %>',
    tasks: [ 'stylus' ],
    options: {
      nospawn: false,
      interrupt: false
    }
  },
  js: {
    files: '<%= cfg.watch.js.files %>',
    tasks: [ 'jscs:client', 'client' ],
    options: {
      nospawn: false,
      interrupt: false
    }
  },
  server: {
    files: '<%= cfg.watch.server.files %>',
    tasks: [ 'jscs:server' ],
    options: {
      nospawn: false,
      interrupt: false
    }
  },
  jade: {
    files: '<%= cfg.watch.jade.files %>',
    tasks: [ 'client' ],
    options: {
      nospawn: false,
      interrupt: false
    }
  },
  statics: {
    files: '<%= cfg.watch.statics.files %>',
    tasks: [ 'copy:statics', 'copy:bower' ],
    options: {
      nospawn: false,
      interrupt: false
    }
  },
  livereload: {
    files: '<%= cfg.watch.livereload.files %>',
    options: {
      nowspawn: false,
      interrupt: false,
      livereload: true
    }
  }
};