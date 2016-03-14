module.exports = (gulp, plugins, cfg) => {
  gulp.task(`watch`, watch);

  function watch() {
    if (cfg.isDev) {
      plugins.util.log(plugins.util.colors.yellow(`watch skipped (NODE_ENV !== "${cfg.localEnv}"))`));

      return;
    }

    plugins.livereload.listen();

    gulp.watch(cfg.js.client.src, [`lint-js-client`, `compile-js`]);
    gulp.watch(cfg.js.server.src, [`lint-js-server`]);
    gulp.watch(cfg.css.src, [`lint-css`, `compile-css`]);
    gulp.watch(cfg.html.src, [`compile-html`]);
  }
};
