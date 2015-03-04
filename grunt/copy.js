module.exports = {
  statics: {
    files: [
      {
        expand: true,
        cwd: '<%= cfg.copy.statics.cwd %>',
        src: '<%= cfg.copy.statics.src %>',
        dest: '<%= cfg.copy.statics.dest %>',
        flatten: false
      }
    ]
  },
  bower: {
    files: [
      {
        expand: true,
        cwd: '<%= cfg.copy.bower.cwd %>',
        src: '<%= cfg.copy.bower.src %>',
        dest: '<%= cfg.copy.bower.dest %>',
        flatten: false
      }
    ]
  },
  angular: {
    files: [
      {
        expand: true,
        cwd: '<%= cfg.copy.angular.cwd %>',
        src: '<%= cfg.copy.angular.src %>',
        dest: '<%= cfg.copy.angular.dest %>',
        flatten: false
      }
    ]
  },
  locales: {
    files: [
      {
        expand: true,
        cwd: '<%= cfg.copy.locales.cwd %>',
        src: '<%= cfg.copy.locales.src %>',
        dest: '<%= cfg.copy.locales.dest %>',
        flatten: false
      }
    ]
  }
};