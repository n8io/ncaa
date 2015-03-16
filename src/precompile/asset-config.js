/*
  This file defines (for Grunt) where asset sources and destinations relative to  the project root
*/

var path = require('path');
var outputDir = 'dist';
var prebuildDir = './src/precompile';
var bowerDir = 'bower_components';

var assets = {
  outputDir: outputDir,
  clean: {
    angular: [
      path.join(outputDir, './html'),
      path.join(outputDir, './js/angular/temp'),
      path.join(outputDir, './js/angular/ng.js')
    ]
  },
  stylus: {
    src: [ path.join(prebuildDir, './css/style.styl') ],
    dest: path.join(outputDir, './css/style.min.css')
  },
  jade: {
    angular: {
      cwd: path.join(prebuildDir, './js/angular'),
      src: [ '**/*.jade' ],
      dest: path.join(outputDir, './html/ng-templates')
    }
  },
  htmlmin: {
    cwd: path.join(outputDir, './html'),
    src: '**/*.html',
    dest: path.join(outputDir, './html')
  },
  copy: {
    statics: {
      cwd: path.join(prebuildDir, './statics'),
      src: [
        './img/**/*',
        './fonts/**/*',
        './js/**/*',
        './css/**/*',
        './locales/**/*'
      ],
      dest: path.join(outputDir, './statics')
    },
    bower: {
      cwd: path.join(prebuildDir, './statics'),
      src: [
        path.join(bowerDir, 'angular/angular.js'),
        path.join(bowerDir, 'angular/angular.min.js'),
        path.join(bowerDir, 'angular/angular.min.js.map'),
        path.join(bowerDir, 'angular-animate/angular-animate.min.js'),
        path.join(bowerDir, 'angular-animate/angular-animate.min.js.map'),
        path.join(bowerDir, 'angular-aria/angular-aria.min.js'),
        path.join(bowerDir, 'angular-aria/angular-aria.min.js.map'),
        path.join(bowerDir, 'angular-material/angular-material.min.css'),
        path.join(bowerDir, 'angular-material/angular-material.min.js'),
        path.join(bowerDir, 'angular-resource/angular-resource.js'),
        path.join(bowerDir, 'angular-resource/angular-resource.min.js'),
        path.join(bowerDir, 'angular-resource/angular-resource.min.js.map'),
        path.join(bowerDir, 'angular-ui-router/release/angular-ui-router.min.js'),
        path.join(bowerDir, 'async/lib/async.js'),
        path.join(bowerDir, 'bootstrap/dist/js/bootstrap.min.js'),
        path.join(bowerDir, 'bootstrap/dist/css/bootstrap.min.css'),
        path.join(bowerDir, 'flag-icon-css/css/flag-icon.min.css'),
        path.join(bowerDir, 'flag-icon-css/flags/**'),
        path.join(bowerDir, 'fontawesome/css/font-awesome.min.css'),
        path.join(bowerDir, 'fontawesome/fonts/*'),
        path.join(bowerDir, 'jquery/dist/jquery.min.js'),
        path.join(bowerDir, 'jquery/dist/jquery.min.map'),
        path.join(bowerDir, 'lodash/lodash.min.js'),
        path.join(bowerDir, 'modernizr/modernizr.js'),
        path.join(bowerDir, 'moment/min/moment.min.js'),
        path.join(bowerDir, 'underscore.string/dist/underscore.string.min.js')
      ],
      dest: path.join(outputDir, './statics')
    },
    angular: {
      cwd: path.join(prebuildDir, './js/angular'),
      src: [ '**/*.js' ],
      dest: path.join(outputDir, './js/angular/temp')
    },
    locales: {
      cwd: './src/server',
      src: [
        './locales/**/*'
      ],
      dest: path.join(outputDir, './statics')
    }
  },
  concat: {
    src: [
      path.join(outputDir, './js/angular/temp/app.js'),
      path.join(outputDir, './js/angular/temp/_common/*.js'),
      path.join(outputDir, './js/angular/temp/*/**')
    ],
    dest: path.join(outputDir, './js/angular/ng.js')
  },
  ngAnnotate: {
    cwd: path.join(outputDir, './js/angular'),
    src: [ '**/*.js' ],
    dest: path.join(outputDir, './js/angular')
  },
  ngtemplates: {
    cwd: path.join(outputDir, './html/ng-templates'),
    src: '**/*.html',
    dest: path.join(outputDir, './js/angular/temp/_common/templates.js')
  },
  uglify: {
    cwd: path.join(outputDir, './js'),
    src: './angular/ng.js',
    dest: path.join(outputDir, './js'),
    ext: '.min.js'
  },
  removelogging: {
    src: path.join(outputDir, './js/angular/ng.min.js'),
    dest: path.join(outputDir, './js/angular/ng.min.js')
  },
  watch: {
    css: {
      files: path.join(prebuildDir, './css/**/*.styl')
    },
    statics: {
      files: [
        path.join(prebuildDir, './statics/**/*'),
        path.join('./src/server', './locales/**/*')
      ]
    },
    js: {
      files: [
        path.join(prebuildDir, './js/**/*.js')
      ]
    },
    server: {
      files: [
        './src/server/**/*'
      ]
    },
    jade: {
      files: [
        path.join(prebuildDir, './js/**/*.jade')
      ]
    },
    livereload: {
      files: [
        path.join(outputDir, './**'),
        './src/server/views/**',
        './src/server/views/!_layouts/**'
      ]
    }
  },
  nodemon: {
    cwd: './src/server',
    debugPort: 5860,
    watch: ['**/*.js', '**/*.json']
  },
  jscs: {
    reporter: './node_modules/jscs-stylish/jscs-stylish.js',
    client: {
      src: [
        path.join(prebuildDir, './js/**/*.js')
      ]
    },
    server: {
      src: [
        './src/server/**/*.js'
      ]
    }
  }
};

module.exports = assets;