var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');

//編譯sass
gulp.task('sass', function () {
    gulp.src('public/sass/*.sass')//抓取sass資料夾中全部sass檔
        .pipe(sass())
        .pipe(gulp.dest('public/css')) //將sass資料夾中全部sass轉譯並存至css資料夾
});

//編譯pug
gulp.task('task_pug', function () {
    console.log(pug);
    return gulp.src('public/*.pug')//抓取資料夾中全部pug檔
        .pipe(pug({ pretty: true })) //格式化
        .pipe(gulp.dest('public/')) //轉譯至public資料夾
});

//靜態頁面html即時預覽
gulp.task('browser-sync', function () {
    browserSync.init({
        server: "public/"////指定啟動根目錄
    });
    gulp.watch('public/sass/*.sass', ['sass']);//監聽sass文件變化，執行sass編譯sass
    gulp.watch('public/*.pug', ['task_pug']);   //監聽pug文件變化，執行task_pug編譯pug
    gulp.watch(['public/*.html',]).on("change", browserSync.reload);//監聽pug文件變化 重整瀏覽器
});
gulp.task('default', ['sass', 'task_pug', 'browser-sync']);