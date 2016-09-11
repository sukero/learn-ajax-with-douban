var gulp = require('gulp');
// Requires plugins
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');
var useref = require('gulp-useref');
var gutil = require('gulp-util');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
// var autoprefixer = require('gulp-autoprefixer');
var gulp_concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var ghPages = require('gulp-gh-pages');
var myth = require('gulp-myth');


gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/myth'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('myth', function() {
  return gulp.src('app/myth/**/*.css') // Gets all files ending with .scss in app/scss
    .pipe(myth())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// gulp.task('autoprefixer', function () {
// 	return gulp.src('app/css/**/*.css')
// 		.pipe(autoprefixer({
// 			browsers: ['last 2 versions'],
// 			cascade: false
// 		}))
// 		.pipe(gulp.dest('dist/css'));
// });

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('js', function() {
    return gulp.src('app/js/*.js')
      .pipe(browserSync.reload({
        stream: true
      }))
})

gulp.task('jade', function () {
  return gulp.src('app/jade/*.jade')
  .pipe(jade({
      pretty: true
    }))
  .pipe(gulp.dest('app/'))
})

gulp.task('html', function() {
    return gulp.src('app/*.html')
      .pipe(browserSync.reload({
        stream: true
      }))
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', minifyCSS()))
    // Uglifies only if it's a Javascript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(useref())
    .pipe(gulp.dest('dist'))
})

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('deploy', function() {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});

gulp.task('serve', ['browserSync', 'images', 'useref', 'myth', 'sass', 'js', 'jade', 'html'], function (){
  gulp.watch('app/myth/**/*.css', ['myth']);
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/*.js', ['js']);
  gulp.watch('app/jade/**/*.jade', ['jade'])
  gulp.watch('app/*.html', ['html']);
  // Other watchers
})
