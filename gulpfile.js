'use strict ';

const gulp = require('gulp');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const util = require('gulp-util');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const smaps = require('gulp-sourcemaps');
const gIf = require('gulp-if');
const del = require('del');
const stylus = require('gulp-stylus');
const bs = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('css', function() {
        return gulp.src('src/stylus.styl')
                .pipe(stylus({
                        'include css': true
                }))
                .pipe(concat('main.css'))
                .pipe(gulp.dest('public'));
});

gulp.task('js', function() {
        return browserify('src/app.js')
                .bundle()
                .on('error', function(e) {
                        util.log(e);
                })
                .pipe(source('bundle.js'))
                .pipe(gulp.dest('public'));
});


gulp.task('html', function() {
        return gulp.src('src/**/*.html')
                .pipe(gulp.dest('public'));
});

gulp.task('clean', function() {
        return del('public');
});

gulp.task('build', gulp.series('clean', gulp.parallel('html', 'css', 'js')));

gulp.task('watch', function() {
        gulp.watch('src/**/*.styl', gulp.series('css'));
        gulp.watch('src/**/*.html', gulp.series('html'));
        gulp.watch('src/**/*.js', gulp.series('js'));
});

gulp.task('serve', function() {
        bs.init({
                server: 'public'
        });

        bs.watch('public/**/*.*').on('change', bs.reload);
});

gulp.task('dev',
        gulp.series('build', gulp.parallel('watch', 'serve')));
