module.exports = {
  angular: {
    options: {
      pretty: true,
      data: {
        cacheKey: '<%= timestampMs %>',
        env: 'dev'
      }
    },
    files: [
      {
        expand: true,
        cwd: '<%= cfg.jade.angular.cwd %>',
        src: '<%= cfg.jade.angular.src %>',
        dest: '<%= cfg.jade.angular.dest %>',
        ext: '.html'
      }
    ]
  }
};