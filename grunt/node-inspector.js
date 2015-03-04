module.exports = {
  dev: {
    options: {
      'web-port': 8080,
      'web-host': 'localhost',
      'debug-port': '<%= cfg.nodemon.debugPort %>',
      'save-live-edit': true,
      hidden: ['node_modules']
    }
  }
};