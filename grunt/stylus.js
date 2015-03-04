module.exports = {
  dist: {
    options: {
      import: ['nib'], // use stylus plugin at compile time
      linenos: true,
      compress: false
    },
    files: [
      {
        src: '<%= cfg.stylus.src %>',
        dest: '<%= cfg.stylus.dest %>'
      }
    ]
  }
};