var gulp = require("gulp");
var htmlbeautify = require("gulp-html-beautify");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var cssbeautify = require("gulp-cssbeautify");
var jsbeautify = require("gulp-beautify");
var replace = require("gulp-replace-path");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var prefix = require("gulp-autoprefixer");

//********** DEVELOPMENT - CODE BEUATIFIERS **********

//html beautify
gulp.task("html-beautify", function() {
  var options = {
    indentSize: 2
  };
  gulp
    .src("./development/*.html")
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest("./development/"));
});

//css beautify
gulp.task("beautifyCSS", function() {
  gulp
    .src(["./development/css/*.css"])
    .pipe(cssbeautify())
    .pipe(gulp.dest("./development/css/"));
});

//js beautify
gulp.task("beautifyJS", function() {
  gulp
    .src(["./development/js/*.js"])
    .pipe(jsbeautify())
    .pipe(replace("function(", "function ("))
    .pipe(gulp.dest("./development/js/"));
});

// Browser Sync & Live Reload
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "./development"
    }
  });
});

//********** DEVELOPMENT DEFAULT - CODE BEAUTIFY **********

gulp.task("clean", ["html-beautify", "beautifyCSS", "beautifyJS"]);

//********** PUTING TO PRODUCTION **********

//***** images *****
//minimize images and puts to production
gulp.task("images", function() {
  gulp
    .src(["./development/img/**/*"])
    .pipe(imagemin())
    .pipe(gulp.dest("./public_html/img/"));
});

//***** JS *****
//uglifies JS and puts to production
gulp.task("uglifyJS", function() {
  gulp
    .src(["./development/js/**/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest("./public_html/js/"));
});

//***** css ****
gulp.task("sass", function() {
  return gulp
    .src("./development/scss/main.scss") // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(prefix("last 5 versions"))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("./development/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

//***** COPY FILES *****

//copies html
gulp.task("copy-html", function() {
  gulp.src(["./development/*.html"]).pipe(gulp.dest("./public_html/"));
});

//copies css
gulp.task("copy-css", function() {
  gulp.src(["./development/css/*.css"]).pipe(gulp.dest("./public_html/css/"));
});

//copies fonts
gulp.task("copy-fonts", function() {
  gulp.src(["./development/fonts/*"]).pipe(gulp.dest("./public_html/fonts/"));
});

gulp.task("watch", ["browserSync", "sass"], function() {
  gulp.watch("development/scss/*.scss", ["sass"]);
  gulp.watch("development/*.html", browserSync.reload);
  gulp.watch("development/js/**/*.js", browserSync.reload);
});

//***** DEFAULT - BUILD PROJECT *****

gulp.task("default", [
  "copy-fonts",
  "copy-html",
  "copy-css",
  "images",
  "sass",
  "uglifyJS"
]);
