(function() {
    var gulp = require('gulp');
    var sourcemaps = require('gulp-sourcemaps');
    var compass = require('gulp-compass');
    var concat = require('gulp-concat');
    var babel = require('gulp-babel');

    // For prod one day
    // var uglify = require('gulp-uglify');
    // var clean = require('gulp-clean');

    gulp.task('compass', function() {
        return gulp.src('./src/scss/*.scss')
            .pipe(compass({
                    config_file: './config.rb',
                    css: 'src/assets/css',
                    sass: 'src/scss'
                }))
            .pipe(gulp.dest('src/assets/css'));
    });

    gulp.task('js', function () {
        return gulp.src([
                'src/js/base/BaseCtrl.js',
                'src/js/base/BaseKeyMapper.js',
                'src/js/controllers/**/*.js',
                'src/js/levels/**/*.js',
                'src/js/main.js',
            ])
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(concat('app.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('src'));
    });

    // For prod one day
    // gulp.task('prod', function () {
    //     gulp.src('prod/', {read: false})
    //         .pipe(clean());

    //     return gulp.src('src/js/*.js')
    //         .pipe(babel())
    //         .pipe(concat('app.js'))
    //         .pipe(uglify())
    //         .pipe(gulp.dest('prod'));
    // });

    gulp.task('default', function() {
        gulp.watch('src/scss/**.scss', ['compass']);
        gulp.watch('src/js/**/*.js', ['js']);
    });
})();
