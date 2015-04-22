(function() {
    var gulp = require('gulp');
    var sourcemaps = require('gulp-sourcemaps');
    var compass = require('gulp-compass');
    var concat = require('gulp-concat');
    var connect = require('gulp-connect');
    var babel = require('gulp-babel');
    var del = require('del');
    var run = require('run-sequence');

    // For prod one day
    // var uglify = require('gulp-uglify');

    gulp.task('clean', function (cb) {
        del([
            'deploy',
        ], cb);
    });

    gulp.task('compass', function() {
        return gulp.src('./src/scss/*.scss')
            .pipe(compass({
                    config_file: './config.rb',
                    css: 'src/assets/css',
                    sass: 'src/scss',
                    sourcemap: true
                }))
            .pipe(gulp.dest('deploy/assets/css'))
            .pipe(connect.reload());
    });

    gulp.task('js', function () {
        return gulp.src([
                'src/js/**/*.js',
            ])
            .pipe(concat('app.js'))
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('deploy/js'))
            .pipe(connect.reload());
    });

    gulp.task('static', function () {
        return gulp.src([
                'src/index.html',
                'src/img/**/*.*'
            ])
            .pipe(gulp.dest('deploy'))
            .pipe(connect.reload());
    });

    gulp.task('vendor', function () {
        return gulp.src([
                'vendor/**/*.*',
            ])
            .pipe(gulp.dest('deploy/vendor'))
            .pipe(connect.reload());
    });

    gulp.task('watch', function () {
        gulp.watch([
                'src/index.html',
                'src/img/**/*.*'
            ], ['static']);
        gulp.watch('src/scss/**.scss', ['compass']);
        gulp.watch('src/js/**/*.js', ['js']);
    });

    gulp.task('connect', function() {
        connect.server({
            port: 5123,
            root: 'deploy',
            livereload: true
        });
    });

    gulp.task('development', function(cb) {
        run(
            'clean', 
            ['vendor', 'static', 'compass', 'js'], 
            'connect', 
            'watch',
            cb);
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

    gulp.task('default', ['development']);
})();
