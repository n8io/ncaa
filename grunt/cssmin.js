module.exports = {
  dist: {
    options:{
      keepSpecialComments: 0,
      banner : '/* Min\'d via CssMin ' + '<%= timestamp %>' + ' */'
    },
    files: [
      {
        src: '<%= cfg.stylus.dest %>',
        dest: '<%= cfg.stylus.dest %>'
      }
    ]
  }
};