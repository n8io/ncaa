module.exports = (gulp, plugins, cfg) => {
  gulp.task(`test-integration`, testIntegration);

  function testIntegration() {
    return gulp.src(cfg.test.integration.src)
      .pipe(plugins.mocha())
      .once(`error`, () => process.exit(1))
      .once(`end`, () => process.exit())
      ;
  }
};
