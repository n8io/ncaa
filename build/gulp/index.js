module.exports = (gulp, plugins) => {
  const cfg = require(`./config`);

  // Register all tasks
  require(`./tasks`)(gulp, plugins, cfg);

  // Expose custom multi-tasks
  gulp.task(`compile`, [`compile-js`, `compile-css`, `compile-html`, `compile-statics`]);
  gulp.task(`compile-css`, [`css`]);
  gulp.task(`compile-html`, [`html`]);
  gulp.task(`compile-js`, [`js`]);
  gulp.task(`compile-statics`, [`statics`]);
  gulp.task(`lint`, [`lint-js`]);
  gulp.task(`lint-js`, plugins.sequence(`lint-server`, `lint-client`));

  gulp.task(`default`, (cb) => plugins.sequence([
    `clean`,
    `git-info`,
    `compile`
  ])(cb));

  gulp.task(`dev`, plugins.sequence(
    [
      `lint`,
      `default`
    ],
    `nodemon`,
    `watch`
  ));
};
