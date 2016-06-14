'use strict';

var gulp = require('gulp');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');

gulp.task('clean', function () {
  return del(['dist']);
});


gulp.task('js', ['clean'], function() {
  return browserify({
    extensions: [".jsx", ".js"],
    entries: 'src/js/app.jsx'
  })
    .transform(babelify.configure({ presets: ["es2015", 'react', 'stage-2'] }))
    .bundle()
    .on("error", function(err) { console.log("Error: " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('html', ['clean'], function () {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch('./src/js/**/*.jsx', ['js']);
});

gulp.task('server', function() {
  connect.server({
    root: 'dist',
    port: 8088,
    livereload: true
  });
});

gulp.task('default', ['js', 'html']);
