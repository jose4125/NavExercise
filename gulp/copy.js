'use strict';
var gulp = require('gulp');
var $$ = require('gulp-load-plugins')();
var config = require('../gulpconfig')();

gulp.task('copy:fonts', function() {
  return gulp.src(config.fonts.src)
          .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('copy:images', function() {
  return gulp.src(config.images.src)
          .pipe(gulp.dest(config.images.dest));
});

gulp.task('copy:html', function() {
  return gulp.src(config.html.src)
          .pipe(gulp.dest(config.html.dest));
});
