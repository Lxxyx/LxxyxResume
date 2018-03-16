const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const jade = require('gulp-jade')
const copy = require('gulp-copy')
const rimrafPromise = require('rimraf-promise')
const ghPages = require('gulp-gh-pages')
const fs = require('fs')
const connect = require('gulp-connect')
const generatePdf = require('./generate_pdf')

gulp.task('resume-sass', () => {
  gulp
    .src('src/scss/resume.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload())
})

gulp.task('icon-sass', () => {
  gulp
    .src('src/scss/iconfont.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest('dist/iconfont/'))
    .pipe(connect.reload())
})

gulp.task('sass:watch', () => {
  gulp.watch('./src/scss/resume.scss', ['resume-sass'])
  gulp.watch('./src/scss/iconfont.scss', ['icon-sass'])
  gulp.watch('./src/scss/components/*.scss', ['resume-sass'])
})

gulp.task('json2jade', () => {
  const info = JSON.parse(fs.readFileSync('./info.json', 'utf-8'))
  const locals = highlight(info)
  gulp
    .src('./src/jade/index.jade')
    .pipe(
      jade({
        locals
      })
    )
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload())
})

gulp.task('json2jade:watch', () => {
  gulp.watch('./info.json', ['json2jade'])
})

function src2dist(dir) {
  return gulp.src(`./src/${dir}/*.*`).pipe(gulp.dest(`./dist/${dir}/`))
}

function highlight(locals) {
  var locals = JSON.stringify(locals)
  const re = /`(.+?)`/g
  locals = locals.replace(re, '<strong>$1</strong>')
  return JSON.parse(locals)
}

gulp.task('copy', () => {
  src2dist('iconfont')
  src2dist('img')
  src2dist('pdf')
  gulp.src('./CNAME').pipe(gulp.dest('./dist'))
})

gulp.task('clean', () => {
  rimrafPromise('./dist/')
})

gulp.task('deploy', () =>
  gulp.src('./dist/**/*').pipe(
    ghPages({
      remoteUrl: 'git@github.com:Lxxyx/lxxyx.github.io.git',
      branch: 'master'
    })
  )
)

let port = 9000

// 避免打印时，同时运行开发服务报错
gulp.task('set-pdf-port', () => {
  port = 9001
})

gulp.task('webserver', () => {
  connect.server({
    root: './dist',
    livereload: true,
    port
  })
})

gulp.task('dev', ['default', 'json2jade:watch', 'sass:watch', 'webserver'])

gulp.task('default', ['icon-sass', 'resume-sass', 'json2jade', 'copy'])

gulp.task('pdf', ['set-pdf-port', 'default', 'webserver'], async () => {
  await generatePdf('http://localhost:9001')
  connect.serverClose()
  process.exit(0)
})
