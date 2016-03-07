module.exports = (gulp, plugins, cfg) => {
  gulp.task(`css`, css);

  function css() {
    return gulp
      .src(cfg.css.src)
      .pipe(plugins.if(
          cfg.env === cfg.localEnv, // Using proper config based on env
          plugins.stylus(cfg.css.options.local),
          plugins.stylus(cfg.css.options.other)
      ))
      .pipe(plugins.csso())
      .pipe(plugins.header(cfg.css.banner.formatStr, cfg.start)) // Add timestamp to banner
      .pipe(plugins.rename(cfg.css.dest.file))
      .pipe(gulp.dest(cfg.css.dest.dir))
      .pipe(plugins.if(
          cfg.env === cfg.localEnv,
          plugins.livereload()
      ))
      ;
  }
};
