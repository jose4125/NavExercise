'use strict';

var gulp = require('gulp');
var $$ = require('gulp-load-plugins')();
var config = require('../gulpconfig')();

gulp.task('default', [
  'watch',
  'styles',
  'scripts',
  'test:default']);
