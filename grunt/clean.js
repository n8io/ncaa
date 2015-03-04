module.exports = {
  dist: {
    options: {
      force: true
    },
    src: '<%= cfg.outputDir %>'
  },
  angular: {
    options: {
      force: true
    },
    src: '<%= cfg.clean.angular %>'
  }
};