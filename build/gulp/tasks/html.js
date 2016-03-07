module.exports = (gulp, plugins, cfg) => {
  gulp.task(`html`, html);

  function html() {
    return gulp.src(cfg.html.src)
      .pipe(plugins.jade(cfg.html.jade))
      .pipe(plugins.if(
        cfg.env === cfg.localEnv,
        plugins.jsbeautifier(cfg.html.beautify.options),
        plugins.htmlmin(cfg.html.min.options)
      ))
      .pipe(gulp.dest(cfg.html.dest))
      ;
  }
};
