var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    inlinesource = require('gulp-inline-source'),
    browserSync = require('browser-sync').create();


//STYLES
gulp.task('styles', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

// //CONVERTE INKY
gulp.task('inky', function() {
  return gulp.src('./templates/**/*.html')
    .pipe(inlinesource())
    .pipe(inky())
    .pipe(inlineCss({
        preserveMediaQueries: true,
        removeLinkTags: false
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

//WATCH
gulp.task('default',function() {

    // Browser-Sync
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch(['./scss/**/*.scss', './templates/**/*.html'], gulp.series('inky'));
});
