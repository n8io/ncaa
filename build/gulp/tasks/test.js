module.exports = (gulp, plugins, cfg) => {
  gulp.task(`test`, test);

  function test() {
    return gulp.src(cfg.test.all.src)
      .pipe(plugins.mocha())
      .once(`error`, () => process.exit(1))
      .once(`end`, () => process.exit())
      ;
  }
};
