 var gulp = require('gulp'),
     uglify = require('gulp-uglify'),
     compass = require('gulp-compass'),
     plumber = require('gulp-plumber'),
     autoprefixer = require('autoprefixer')
     rename = require('gulp-rename')

 gulp.task('scripts', function(){
   gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
    .pipe(plumber())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
 })

 gulp.task('watch', function(){
   gulp.watch('app/js/**/*.js', ['scripts'])
   gulp.watch('app/scss/style.scss', ['compass'])
 })

 //css task
 gulp.task('compass', function(){
   gulp.src('app/scss/*.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: './config.rb',
      css: 'app/css',
      sass: 'app/sass',
      require: ['susy']
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('app/css/'))
 })
//default task calls all other tasks
gulp.task('default', ['scripts', 'watch', 'compass'])
