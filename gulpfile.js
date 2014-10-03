"use strict";

var gulp = require("gulp");
var jshint    = require("gulp-jshint");
var mocha     = require("gulp-mocha");
var istanbul  = require("gulp-istanbul");
var browerify = require("gulp-browserify");
var rename    = require("gulp-rename");

gulp.task("lint", function() {
  return gulp.src([ "gulpfile.js", "src/**/*.js", "test/**/*.js" ])
    .pipe(jshint())
    .pipe(jshint.reporter(require("jshint-stylish")))
    .pipe(jshint.reporter("fail"));
});

gulp.task("test", function() {
  return gulp.src("test/**/*.js")
    .pipe(mocha());
});

gulp.task("cover", function(cb) {
  gulp.src("src/**/*.js")
    .pipe(istanbul())
    .on("finish", function() {
      return gulp.src("test/**/*.js")
        .pipe(mocha())
        .pipe(istanbul.writeReports("coverage"))
        .on("end", cb);
    });
});

gulp.task("build", function() {
  return gulp.src("src")
    .pipe(browerify())
    .pipe(rename("web-audio-test-api.js"))
    .pipe(gulp.dest("build"));
});

gulp.task("travis", [ "lint", "cover" ]);
gulp.task("default", [ "lint", "cover", "build" ]);
