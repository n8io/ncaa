const del = require(`del`);

module.exports = (gulp, plugins, cfg) => {
  gulp.task(`clean`, () => del.sync(cfg.clean.src));
};
