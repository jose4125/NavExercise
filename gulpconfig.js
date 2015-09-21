'use strict';
module.exports = function() {
  var app = './app/';
  var dest = './public/';
  var styles = 'styles.sass';
  var test = './test/';

  var config = {
    html: {
      src: app + '*.html',
      dest: dest
    },
    fonts: {
      src: app + 'fonts/**/*{ttf,woff,eot,svg}',
      dest: dest + 'fonts'
    },
    images: {
      src: app + 'images/**/*{png,jpg,jpeg,svg}',
      dest: dest + 'images'
    },
    styles: {
      src: app + 'styles/' + styles,
      dest: dest + 'styles',
      watch: app + '**/*.sass'
    },
    scripts: {
      src: app + 'scripts/**/*.js',
      dest: dest + 'scripts'
    },
    test: {
      configFile: './karma.conf.js',
      src: ['./app/scripts/**/*.js', './test/**/*-spec.js']
    }
  };
  return config;
};
