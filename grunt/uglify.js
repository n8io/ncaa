module.exports = {
  dev: {
    options: {
      mangle: false,
      compress: false,
      preserveComments: 'some',
      beautify: {
        beautify: true,
        indent_level: 2
      }
    },
    files: [
      {
        expand: true,
        cwd: '<%= cfg.uglify.cwd %>',
        src: '<%= cfg.uglify.src %>',
        dest: '<%= cfg.uglify.dest %>',
        ext: '<%= cfg.uglify.ext %>'
      }
    ]
  },
  prod: {
    options: {
      mangle: true,
      banner : '/* Min\'d via UglifyJs ' + '<%= timestamp %>' + ' */\n'
    },
    files: [
      {
        expand: true,
        cwd: '<%= cfg.uglify.cwd %>',
        src: '<%= cfg.uglify.src %>',
        dest: '<%= cfg.uglify.dest %>',
        ext: '<%= cfg.uglify.ext %>'
      }
    ]
  }
};