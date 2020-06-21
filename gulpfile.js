const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const jade = require('gulp-jade')
const copy = require('gulp-copy')
const rimrafPromise = require('rimraf-promise')
const ghPages = require('gulp-gh-pages')
const fs = require('fs')
const connect = require('gulp-connect')
const yaml = require('js-yaml')
const chrome = require('chrome-aws-lambda')
const puppeteer = require('puppeteer')

gulp.task('resume-sass', () => {
  gulp
    .src('src/scss/resume.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false,
      })
    )
    .pipe(gulp.dest('public/css/'))
    .pipe(connect.reload())
})

gulp.task('icon-sass', () => {
  gulp
    .src('src/scss/iconfont.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false,
      })
    )
    .pipe(gulp.dest('public/iconfont/'))
    .pipe(connect.reload())
})

gulp.task('sass:watch', () => {
  gulp.watch('./src/scss/resume.scss', ['resume-sass'])
  gulp.watch('./src/scss/iconfont.scss', ['icon-sass'])
  gulp.watch('./src/scss/components/*.scss', ['resume-sass'])
})

gulp.task('yaml2jade', () => {
  const resume = yaml.safeLoad(fs.readFileSync('./resume.yaml', 'utf-8'))
  const locals = highlight(resume)
  gulp
    .src('./src/jade/index.jade')
    .pipe(
      jade({
        locals,
      })
    )
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload())
})

gulp.task('yaml2jade:watch', () => {
  gulp.watch('./resume.yaml', ['yaml2jade'])
})

function src2dist(dir) {
  return gulp.src(`./src/${dir}/*.*`).pipe(gulp.dest(`./public/${dir}/`))
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
  gulp.src('./CNAME').pipe(gulp.dest('./public'))
})

gulp.task('clean', () => {
  rimrafPromise('./public/')
})

gulp.task('deploy', () =>
  gulp.src('./public/**/*').pipe(
    ghPages({
      remoteUrl: 'git@github.com:Lxxyx/lxxyx.github.io.git',
      branch: 'master',
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
    root: './public',
    livereload: true,
    port,
  })
})

gulp.task('dev', ['default', 'yaml2jade:watch', 'sass:watch', 'webserver'])

gulp.task('default', ['icon-sass', 'resume-sass', 'yaml2jade', 'copy'])

gulp.task('pdf', ['set-pdf-port', 'default', 'webserver'], async () => {
  const fonts = fs.readdirSync('./fonts')
  for (let font of fonts) {
    await chrome.font(font)
  }

  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: true,
  })

  const page = await browser.newPage()

  await page.setViewport({
    width: 1440,
    height: 900,
  })

  await page.goto('http://localhost:9001')
  await delay(100)

  await page.pdf({
    path: './src/pdf/resume.pdf',
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    margin: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  })

  src2dist('pdf')
  console.log('PDF生成在 ./src/pdf 中了')

  browser.close()
  connect.serverClose()
  process.exit(0)
})

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
