module.exports = {
  'default': [
    'preprocess',
    'client-prod',
    'postprocess'
  ],
  'client-prod': [
    'jade',
    'ngtemplates',
    'htmlmin',
    'stylus',
    'cssmin',
    'copy',
    'ngAnnotate',
    'concat',
    'removelogging',
    'uglify:prod'
  ],
  watcher: [
    'dev',
    'concurrent'
  ],
  prod: [
    'default'
  ],
  dev: [
    'preprocess',
    'client',
    'postprocess'
  ],
  client: [
    'jade',
    'ngtemplates',
    'stylus',
    'copy',
    'ngAnnotate',
    'concat',
    'uglify:dev'
  ],
  lint: [
    'jscs:client',
    'jscs:server'
  ],
  preprocess: [
    'lint',
    'clean:dist'
  ],
  postprocess: [
    'clean:angular'
  ]
};
