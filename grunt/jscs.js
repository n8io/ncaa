module.exports = {
  client: {
    src: '<%= cfg.jscs.client.src %>',
    options: {
      reporter: '<%= cfg.jscs.reporter %>'
    }
  },
  server: {
    src: '<%= cfg.jscs.server.src %>',
    options: {
      reporter: '<%= cfg.jscs.reporter %>'
    }
  }
};