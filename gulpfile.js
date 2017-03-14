var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var jade = require('gulp-jade')
var copy = require('gulp-copy')
var rimrafPromise = require('rimraf-promise')
var ghPages = require('gulp-gh-pages')
var fs = require('fs')
var connect = require('gulp-connect')

gulp.task('resume-sass', function () {
  gulp.src('src/css/resume.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload())
})

gulp.task('icon-sass', function () {
  gulp.src('src/css/iconfont.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
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
  var info = JSON.parse(fs.readFileSync('./info.json', 'utf-8'))
  var locals = highlight(info)
  gulp.src('./src/jade/index.jade')
    .pipe(jade({
      locals: locals
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload())
})

gulp.task('json2jade:watch', function () {
  gulp.watch('./info.json', ['json2jade'])
})

function src2dist(dir) {
  return gulp.src(`./src/${dir}/*.*`).pipe(gulp.dest(`./dist/${dir}/`))
}

function highlight(locals) {
  var locals = JSON.stringify(locals)
  var re = /`(.+?)`/g
  locals = locals.replace(re, '<strong>$1</strong>')
  return JSON.parse(locals)
}

gulp.task('copy', () => {
  src2dist('iconfont')
  src2dist('img')
  src2dist('pdf')
})

gulp.task('clean', () => {
  rimrafPromise('./dist/')
})

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
  .pipe(ghPages({
    remoteUrl: 'git@github.com:Lxxyx/lxxyx.github.io.git',
    branch: 'master'
  }))
})

gulp.task('webserver', function () {
    connect.server({
        root: './dist',
        livereload: true,
        port:9000
    })
})

gulp.task('dev', ['icon-sass', 'resume-sass', 'json2jade', 'copy', 'json2jade:watch', 'sass:watch', 'webserver'])

gulp.task('default', ['icon-sass', 'resume-sass', 'json2jade', 'copy'])
