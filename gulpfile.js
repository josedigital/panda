'use strict';

var env         = require('minimist')(process.argv.slice(2));
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var handlebars  = require('gulp-compile-handlebars');
var clean       = require('gulp-clean');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync');
var nodemon     = require('gulp-nodemon');
var plumber     = require('gulp-plumber');
var browserify  = require('gulp-browserify');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var gulpif      = require('gulp-if');
var imagemin    = require('gulp-imagemin');
var cache       = require('gulp-cache');


gulp.task('hbs', function () {
  var options = {
    batch: ['views/layouts']
  }
  return gulp.src('views/**/*.hbs')
    .pipe(plumber())
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest('public'));
});

gulp.task('cleandir', function () {
  return gulp.src('public/layouts', {read: false})
    .pipe(clean());
});


gulp.task('sass', function() {
  gulp.src('src/css/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// concat all js
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(concat('init.js'))
    .pipe(gulpif(env.p, uglify()))
    .pipe(gulp.dest('public/js'));
});

/* ***************************************************************************
// // Spin up a temp server
// gulp.task("browserSync", function() {
//   browserSync({
//     server: {
//       baseDir: "public"
//     }
//   })
// });
//
// // testing sass and browserSync
// gulp.task("watch", ["browserSync", "sass"], function() {
//   gulp.watch("src/scss/**\/*.scss", ["sass"]);
//   gulp.watch("public/*.html").on("change", browserSync.reload);
// });
***************************************************************************** */

// nodemon - start and keep from restarting server
gulp.task('nodemon', function(callback) {
  return nodemon({
    script: 'app.js'
  }).once('start', callback);
});

gulp.task('watch', function () {
  gulp.watch('./views/**/*.hbs', ['hbs']);
  gulp.watch('./src/css/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', [(env.fy) ? 'browserify' : 'js']);
  // gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
});

// sync dev actions with browser - browser-sync -> which calls nodemon
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:3000/',
    files: ['./public/**/*.*'],
    browser: 'google chrome',
    port: 4000
  });
});

gulp.task('html', ['hbs', 'cleandir']);


// Default task
// gulp.task('default', [(env.fy) ? 'browserify' : 'js', 'pug', 'copy', 'stylus', 'imagemin', 'watch', 'browser-sync']);
gulp.task('default', ['hbs', 'sass', 'watch', 'browser-sync']);
