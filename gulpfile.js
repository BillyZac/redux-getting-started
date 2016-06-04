'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
// var jshint = require('gulp-jshint');
var scsslint = require('gulp-scss-lint');
var html5lint = require('gulp-html5-lint');
var connect = require('gulp-connect');

gulp.task('clean', function () {
  return del(['dist']);
});

// gulp.task('js-lint', function() {
//   return gulp.src(['src/js/**/*.js', 'src/js/**.jsx', '!node_modules/**'])
//     .pipe(jshint({ linter: require('jshint-jsx').JSXHINT }))
//     .pipe(jshint.reporter("default", {verbose: true}))
//     .pipe(jshint.reporter("fail"));
// });

// Took jshint out of this task.
gulp.task('js', ['clean'], function() {
  return browserify({
    extensions: [".jsx", ".js"],
    entries: 'src/js/app.jsx'
  })
    .transform(babelify.configure({ presets: ["es2015", 'react'] }))
    .bundle()
    .on("error", function(err) { console.log("Error: " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('scss-lint', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(scsslint());
});

gulp.task('css', ['clean', 'scss-lint'],  function () {
  return gulp.src('./src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('css-prod', ['clean'], function () {
  return gulp.src('./src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('html', ['clean', 'html-lint'], function () {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('html-lint', function() {
  return gulp.src('src/**/*.html')
    .pipe(html5lint());
});

gulp.task('watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['css']);
  gulp.watch('./src/js/**/*.jsx', ['js']);
});

gulp.task('server', function() {
  connect.server({
    root: 'dist',
    port: 8088,
    livereload: true
  });
});

gulp.task('default', ['js', 'css', 'html']);
