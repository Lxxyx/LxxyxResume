var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('jade');
var gulpJade = require('gulp-jade');
var data = require('gulp-data');
var path = require('path')

gulp.task('resume-sass', function() {
  return gulp.src('src/css/resume.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('icon-sass', function() {
  return gulp.src('src/css/iconfont.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/iconfont/'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./src/css/resume.scss', ['resume-sass']);
  gulp.watch('./src/css/iconfont.scss', ['icon-sass']);
  gulp.watch('./src/css/components/*.scss', ['resume-sass']);
});

// gulp.task('json2jade', function() {
//   return gulp.src('./getresume.jade')
//     .pipe(data(function(file) {
//       return require('./info.json')
//     }))
//     .pipe(gulpJade({
//       jade: jade,
//       pretty: true
//     }))
//     .pipe(gulp.dest('./'))
// });

// gulp.task('json2jade:watch', function() {
//   gulp.watch('./test.json', ['json2jade']);
// });

gulp.task('default', ['resume-sass','icon-sass','sass:watch'], function() {
  console.log('gulp start')
});
