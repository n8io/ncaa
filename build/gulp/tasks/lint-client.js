const cwd = require(`cwd`);

module.exports = (gulp, plugins, cfg) => {
  gulp.task(`lint-client`, lintClient);

  function lintClient() {
    const customGulpFormatter = require(cwd(`build/gulp/customGulpFormatter`));

    return gulp.src(cfg.js.client.src, {base: `./`})
      .pipe(plugins.eslint({fix: true}))
      .pipe(plugins.if(isFixed, gulp.dest(`.`)))
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format(customGulpFormatter))
      .pipe(plugins.eslint.failAfterError())
      ;
  }

  function isFixed(file) {
    // Has ESLint fixed the file contents?
    return file.eslint !== null && file.eslint.fixed;
  }
};
