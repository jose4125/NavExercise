'use strict';
var gulp = require('gulp');
var $$ = require('gulp-load-plugins')();
var config = require('../gulpconfig')();

gulp.task('scripts', function() {
  return gulp.src(config.scripts.src)
          .pipe($$.concat('app.js'))
          .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('scripts:build', function() {
  return gulp.src(config.scripts.src)
          .pipe($$.concat('app.js'))
          .pipe($$.uglify())
          .pipe(gulp.dest(config.scripts.dest));
});
