var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css/'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./sass/*.scss', ['sass'])
});

gulp.task('default',['sass','sass:watch']);
