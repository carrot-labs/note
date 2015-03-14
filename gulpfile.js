/**
 * Module dependencies
 */

var gulp = require('gulp');

var jshint  = require('gulp-jshint');
var plumber = require('gulp-plumber');
var stylish = require('jshint-stylish');


/**
 * Pre-jshint task
 */

gulp.task('pre-jshint', function() {
  gulp
    .src('server/**/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
}); 


/**
 * Jshint task
 */

gulp.task('jshint', function() {
  gulp.watch('server/**/*.js', ['pre-jshint']);
});