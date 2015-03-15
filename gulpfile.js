/**
 * Module dependencies
 */

var gulp = require('gulp');

var clean      = require('gulp-clean');
var concat     = require('gulp-concat');
var imagemin   = require('gulp-imagemin');
var jade       = require('gulp-jade');
var jeet       = require('jeet');
var jshint     = require('gulp-jshint');
var kouto      = require('kouto-swiss');
var plumber    = require('gulp-plumber');
var rupture    = require('rupture');
var sourcemaps = require('gulp-sourcemaps');
var stylish    = require('jshint-stylish');
var stylus     = require('gulp-stylus');
var uglify     = require('gulp-uglify');
var watch      = require('gulp-watch');

/**
 * Jshint server task
 */

gulp.task('jshint-server', function() {
  gulp
    .src('server/**/*.js')
    .pipe(plumber())
    .pipe(watch('server/**/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
}); 

/**
 * Angular task
 */

gulp.task('angular', function() {
  var angularFiles = ['front/app/**/*.js'];

  gulp
    .src(angularFiles)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/js/'));
});

/**
 * Jshint front task
 */

gulp.task('jshint-front', function() {
  gulp
    .src('front/**/*.js')
    .pipe(plumber())
    .pipe(watch('front/**/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

/**
 * Server task
 */

gulp.task('server', function() {
  browser({
    server: {
      baseDir: './public'
    },
    port: 3000
  });
});

/**
 * Jade task
 */

gulp.task('jade', function() {
  gulp
    .src('front/**/*.jade')
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('public'));
});

/**
 * Stylus task
 */

gulp.task('stylus', function() {
  gulp
    .src('front/assets/styl/main.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true,
      use: [jeet(), kouto(), rupture()]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/css'));
});

/**
 * Scripts task
 */

gulp.task('scripts', function() {
  gulp
    .src('front/assets/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/js'));
});

/**
 * Images task
 */

gulp.task('images', function() {
  gulp.src('front/assets/img/**/*')
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('public/assets/img'));
});

/**
 * Watch task
 */

gulp.task('watch', ['angular', 'jade', 'stylus', 'scripts', 'images'], function() {
  gulp.watch('front/app/**/*.js', ['angular']);
  gulp.watch('front/**/*.jade', ['jade']);
  gulp.watch('front/assets/styl/**/*.styl', ['stylus']);
  gulp.watch('front/assets/js/**/*.js', ['scripts']);
  gulp.watch('front/assets/img/**/*', ['images']);
});