'use strict';
var gulp = require('gulp');
var del = require('del');
var $$ = require('gulp-load-plugins')();
var config = require('../gulpconfig')();

function clean(path, done) {
  del(path, done);
}

gulp.task('clean:fonts', function(cb) {
  clean(config.fonts.dest, cb);
});

gulp.task('clean:images', function(cb) {
  clean(config.images.dest, cb);
});

gulp.task('clean:html', function(cb) {
  clean(config.html.dest + 'index.html', cb);
});
