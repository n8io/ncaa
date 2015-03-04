module.exports = {
  dist: {
    options: {
      singleQuotes: true
    },
    files: [
      {
        expand: true,
        cwd: '<%= cfg.ngAnnotate.cwd %>',
        src: '<%= cfg.ngAnnotate.src %>',
        dest: '<%= cfg.ngAnnotate.dest %>'
      }
    ]
  }
};