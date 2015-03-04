module.exports = {
  app: {
    cwd: '<%= cfg.ngtemplates.cwd %>',
    src: '<%= cfg.ngtemplates.src %>',
    dest: '<%= cfg.ngtemplates.dest %>',
    options: {
      htmlmin:  {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      },
      url: function(url) { return url.replace('.html', ''); },
      bootstrap:  function(module, script) {
        var jsLines = script.split('\n');
        jsLines.splice(0, 2); //Pop off the extra 'use strict' line and newlines
        jsLines.splice(jsLines.length - 1, 1);
        var lines = [
          '\'use strict\';',
          '  angular',
          '    .module(\'' + module + '\')',
          '    .run(preloadTemplates)',
          '    ;',
          '',
          '  /* @ngInject */',
          '  function preloadTemplates($templateCache){',
          jsLines.join('\n    '),
          '};'
        ];

        var js = lines.join('\n  ');
        return '(function(){\n  ' + js + '\n})();';
      }
    }
  }
};