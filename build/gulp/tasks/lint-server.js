const cwd = require(`cwd`);

module.exports = (gulp, plugins, cfg) => {
  gulp.task(`lint-server`, lintServer);

  function lintServer() {
    const customGulpFormatter = require(cwd(`build/gulp/customGulpFormatter`));

    return gulp.src(cfg.js.server.src, {base: `./`})
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
