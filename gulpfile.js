var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var jade = require('gulp-jade')
var copy = require('gulp-copy')
var rimrafPromise = require('rimraf-promise')
var ghPages = require('gulp-gh-pages')

gulp.task('resume-sass', function () {
  gulp.src('src/css/resume.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css/'))
})

gulp.task('icon-sass', function () {
  gulp.src('src/css/iconfont.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/iconfont/'))
})

gulp.task('sass:watch', function () {
  gulp.watch('./src/css/resume.scss', ['resume-sass'])
  gulp.watch('./src/css/iconfont.scss', ['icon-sass'])
  gulp.watch('./src/css/components/*.scss', ['resume-sass'])
})

gulp.task('json2jade', function () {
  var locals = require('./info.json')
  gulp.src('./src/jade/index.jade')
    .pipe(jade({
      locals: locals
    }))
    .pipe(gulp.dest('./dist/'))
})

function src2dist(dir) {
  return gulp.src(`./src/${dir}/*.*`).pipe(gulp.dest(`./dist/${dir}/`))
}

gulp.task('copy', () => {
  src2dist('iconfont')
  src2dist('img')
  src2dist('pdf')
})

gulp.task('clean', () => {
  rimrafPromise('./dist/')
})

gulp.task('deploy', () => {
  gulp.src('./dist/**/*')
  .pipe(ghPages({
    remoteUrl: 'git@github.com:Lxxyx/lxxyx.github.io.git',
    branch: 'master'
  }))
})

gulp.task('default', ['icon-sass', 'resume-sass', 'json2jade', 'copy'])
