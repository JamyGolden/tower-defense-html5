(function() {
    var gulp = require('gulp');
    var sourcemaps = require('gulp-sourcemaps');
    var compass = require('gulp-compass');
    var traceur = require('gulp-traceur');
    var concat = require('gulp-concat');

    gulp.task('compass', function() {
        gulp.src('./src/scss/*.scss')
            .pipe(compass({
                    config_file: './config.rb',
                    css: 'src/assets/css',
                    sass: 'src/scss'
                }))
            .pipe(gulp.dest('src/assets/css'));
    });

    gulp.task('js', function() {
        gulp.src('./src/js/**/*.js')
            .pipe(sourcemaps.init())
                .pipe(traceur())
                .pipe(concat('app.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('src'));
    });

    gulp.task('default', function() {
        gulp.watch('src/scss/**.scss', ['compass']);
        gulp.watch('src/js/**/*.js', ['js']);
    });
})();
