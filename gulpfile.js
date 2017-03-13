'use strict';

var gulp  = require('gulp'),
server = require('gulp-server-livereload'),
watch = require('gulp-watch'),
sass = require('gulp-sass'),
postcss = require('gulp-postcss'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('autoprefixer'),
lost = require('lost');

gulp.task('compileSass', function () {
  return gulp.src('scss/main.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('scss/**/*.scss', ['compileSass']);
});

gulp.task('webserver',['compileSass','sass:watch'], function() {
  gulp.src('./')
  .pipe(server({
    defaultFile: 'index.html',
    port: 3000,
    livereload: {
      enable: true,
      filter: function (filename, cb) {
        cb(!/\.(sa|le)ss$|node_modules/.test(filename));
      }
    },
    open: true
  }));
});
