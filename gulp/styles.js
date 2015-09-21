'use strict';
var gulp = require('gulp');
var $$ = require('gulp-load-plugins')();
var config = require('../gulpconfig')();

gulp.task('styles', function() {
  return gulp.src(config.styles.src)
          .pipe($$.sass().on('error', $$.sass.logError))
          .pipe(gulp.dest(config.styles.dest));
});

gulp.task('styles:build', function() {
  return gulp.src(config.styles.src)
          .pipe($$.sass().on('error', $$.sass.logError))
          .pipe($$.csso())
          .pipe(gulp.dest(config.styles.dest));
});
