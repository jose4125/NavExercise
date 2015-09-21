'use strict';

var gulp = require('gulp');
var $$ = require('gulp-load-plugins')();
var config = require('../gulpconfig')();

gulp.task('watch', function() {
  gulp.watch(config.styles.watch, ['styles']);
  gulp.watch(config.scripts.src, ['scripts']);
  gulp.watch(config.html.src, ['copy:html']);
});
