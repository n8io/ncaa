module.exports = (gulp, plugins, cfg) => {
  const livereload = plugins.livereload;

  gulp.task(`nodemon`, nodemon);

  function nodemon() {
    const monitor = plugins.nodemon(cfg.nodemon);

    // Required to handle bug when attempting to quit with Cmd + C
    monitor
      .on(`restart`, onAppRestarted)
      .on(`quit`, () => process.exit())
      ;
  }

  function onAppRestarted() {
    setTimeout(() => livereload.changed(`Server restarted and browser is about to be`), 3000);
  }
};
