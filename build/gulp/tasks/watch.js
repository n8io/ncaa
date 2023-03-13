module.exports = (gulp, plugins, cfg) => {
  gulp.task(`watch`, watch);

  function watch() {
    if (cfg.isDev) {
      plugins.util.log(
        plugins.util.colors.yellow(
          `watch skipped (NODE_ENV !== "${cfg.localEnv}"))`
        )
      );

      return;
    }

    plugins.livereload.listen();

    gulp.watch(cfg.css.src, [`compile-css`]);
    gulp.watch(cfg.html.src, [`compile-html`]);
  }
};
