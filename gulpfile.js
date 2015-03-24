/**
 * Module dependencies
 */

var gulp = require('gulp');

// var browser    = require('browser-sync');
var clean      = require('gulp-clean');
var concat     = require('gulp-concat');
var imagemin   = require('gulp-imagemin');
var jade       = require('gulp-jade');
var jeet       = require('jeet');
var jshint     = require('gulp-jshint');
var kouto      = require('kouto-swiss');
var plumber    = require('gulp-plumber');
// var reload     = require('browser-sync').reload;
var rupture    = require('rupture');
var sourcemaps = require('gulp-sourcemaps');
var stylish    = require('jshint-stylish');
var stylus     = require('gulp-stylus');
var uglify     = require('gulp-uglify');
var watch      = require('gulp-watch');

/**
 * Jshint task
 */

gulp.task('jshint', function() {
  gulp
    .src('server/**/*.js')
    .pipe(plumber())
    .pipe(watch('server/**/*.js'))
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
 * Reload task
 *
 * Reloads the browser
 */

gulp.task('reload', function() {
  reload();
});

/**
 * Stylus task
 *
 * Converts stylus files into css
 */

gulp.task('stylus', function () {
  return gulp
    .src(['public/**/*.styl', '!public/styles/{base,modules}/**/*.styl', '!public/styles/base.styl'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true,
      use: [jeet(), kouto(), rupture()]
    }))
    .pipe(sourcemaps.write())
    // .pipe(reload({stream: true}))
    .pipe(gulp.dest('public'));
});

/**
 * Watch task
 */

gulp.task('watch', ['stylus'], function() {
  gulp.watch('public/**/*.styl', ['stylus']);

  // gulp.watch('public/**/*.html', ['reload']);
});

/**
 * Default task
 */

gulp.task('default', ['watch']);