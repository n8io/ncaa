const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const cwd = require('cwd');

require(cwd('build/gulp'))(gulp, plugins);
