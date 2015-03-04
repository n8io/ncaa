module.exports = {
  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    files: [
      {
        expand: true,
        cwd: '<%= cfg.htmlmin.cwd %>',
        src: '<%= cfg.htmlmin.src %>',
        dest: '<%= cfg.htmlmin.dest %>'
      }
    ]
  }
};