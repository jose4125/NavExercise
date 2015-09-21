'use strict';

var gulp = require('gulp');
var $$ = require('gulp-load-plugins')();
var config = require('../gulpconfig')();

gulp.task('build', [
  'clean:html',
  'clean:images',
  'clean:fonts',
  'styles:build',
  'scripts:build',
  'copy:html',
  'copy:fonts',
  'copy:images',
  'test']);
