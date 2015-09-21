'use strict';
var gulp = require('gulp');
var $$ = require('gulp-load-plugins')();
var config = require('../gulpconfig')();

gulp.task('test:default', function() {
  return gulp.src(config.test.src)
          .pipe($$.karma({
            configFile: config.test.configFile,
            action: 'watch'
          }));
});

gulp.task('test', function() {
  return gulp.src(config.test.src)
          .pipe($$.karma({
            configFile: config.test.configFile,
            action: 'run'
          }))
          .on('error', function(error) {
            throw error;
          });
});
