module.exports = (gulp, plugins, cfg) => {
  gulp.task(`js`, js);

  function js() {
    return gulp.src(cfg.js.client.src)
      // .pipe(plugins.debug())
      .pipe(plugins.iife({prependSemicolon: false})) // Wrap each file content in an IIFE
      .pipe(plugins.concat(cfg.js.client.filenameDebug)) // Concatenate all files to the unmin'd file name
      .pipe(plugins.babel()) // Transpile down to ES5
      .pipe(plugins.ngAnnotate(cfg.js.client.ngAnnotate)) // Add fn.$inject = ... dependencies to stay min safe
      .pipe(plugins.jsbeautifier(cfg.js.client.jsbeautifier)) // Put it in a consistent format
      .pipe(plugins.replace(`\n(function() {})();`, ``)) // Remove any empty iifes
      .pipe(plugins.header(cfg.js.client.banner.formatStr, cfg.start)) // Add timestamp to banner
      .pipe(gulp.dest(cfg.js.client.dest)) // Write it to the dest dir
      .pipe(plugins.concat(cfg.js.client.filename)) // Concatenate all files to the min'd file name
      .pipe(plugins.stripDebug()) // Rip out console statements
      .pipe(plugins.uglify(cfg.js.client.uglify)) // Mangle and min it all
      .pipe(plugins.header(cfg.js.client.banner.formatStr, cfg.start)) // Add timestamp to banner
      .pipe(gulp.dest(cfg.js.client.dest)) // Write it to the dest dir
      .pipe(plugins.if( // Make files for livereload if in local env
        cfg.env === cfg.localEnv,
        plugins.livereload()
      ))
      ;
  }
};
