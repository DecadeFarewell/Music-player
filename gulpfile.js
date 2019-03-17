//引入gulp
const gulp = require('gulp')
//html压缩插件
const htmlClean = require('gulp-htmlclean')
//css压缩插件
const cleanCss = require('gulp-clean-css')
//less插件
const less = require('gulp-less')
//postcss autoprefixer  自动添加css3 前缀
const postCss = require('gulp-postcss')
const autoPrefixer = require('autoprefixer')
//js压缩插件
const uglify = require('gulp-uglify')
//图片打包
const imageMin = require('gulp-imagemin')
//清除调试语句
// const stripDebug = require('gulp-strip-debug')

//引入服务器接口
const connect = require('gulp-connect')

//判断当前环境变量当前的环境
const devMod = process.env.NODE_ENV == 'development'
console.log(devMod)

const folder = {
    src: './src',
    dist: './dist'
}

//html
gulp.task('html', function () {
    const html = gulp.src(folder.src + '/html/*')
                     .pipe(connect.reload())
    if (!devMod) {
        html.pipe(htmlClean())
    }
    html.pipe(gulp.dest(folder.dist + '/html/'))
})

//css
gulp.task('css', function () {
    const css = gulp.src(folder.src + '/css/*')
                    .pipe(less())
                    .pipe(connect.reload())
    if (!devMod) {
        css.pipe(cleanCss())
            .pipe(postCss([autoPrefixer()]))
    }
    css.pipe(gulp.dest(folder.dist + '/css/'))
})

//js
gulp.task('js', function () {
    const js = gulp.src(folder.src + '/js/*')
                    .pipe(connect.reload())
    if (!devMod) {
        js.pipe(uglify())
    }
    js.pipe(gulp.dest(folder.dist + '/js/'))
})

//image
gulp.task('image', function () {
    gulp.src(folder.src + '/images/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + '/images/'))
})
//实时监听文件的变化
gulp.task('watch',function(){
    gulp.watch(folder.src + '/html/*',['html']);
    gulp.watch(folder.src + '/css/*',['css'])
    gulp.watch(folder.src + '/images/*',['image'])
    gulp.watch(folder.src + '/js/*',['js'])
})

//运行到本地服务器上
gulp.task('server', function () {
    connect.server({
        port: 8899,
        livereload: true,
    })
})

gulp.task('default', ['html', 'css', 'js', 'server', 'image','watch'])