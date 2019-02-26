/*
Commands to make dist and ready to use

    => Before starting project
        1. npm install
        2. gulp build_plugins


    => After project completion
        1. gulp prefix_css
        
*/


const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps   = require('gulp-sourcemaps');


// File Copy
gulp.task('build_plugins', function() {
    // Jquery
    gulp.src('./node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('./src/assets/plugins/jquery/'));

    // Bootstrap
    gulp.src('node_modules/bootstrap/scss/**/*').pipe(gulp.dest('./src/assets/plugins/bootstrap/scss/'));
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('./src/assets/plugins/bootstrap/dist/css/'));
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js').pipe(gulp.dest('./src/assets/plugins/bootstrap/dist/js/'));

    // Bootstrap rtl
    gulp.src('node_modules/bootstrap-v4-rtl/scss/**/*').pipe(gulp.dest('./src/assets/plugins/bootstrap-v4-rtl/scss/'));

    // Animate.css
    gulp.src('node_modules/animate.css/animate.min.css').pipe(gulp.dest('./src/assets/plugins/animate/'));

    // MetisMenu
    gulp.src('node_modules/metismenu/dist/metisMenu.min.css').pipe(gulp.dest('./src/assets/plugins/metismenu/css/'));
    gulp.src('node_modules/metismenu/dist/metisMenu.min.js').pipe(gulp.dest('./src/assets/plugins/metismenu/js/'));
    
    // Jquery Slimscroll
    gulp.src('node_modules/jquery-slimscroll/jquery.slimscroll.min.js').pipe(gulp.dest('./src/assets/plugins/jquery-slimscroll/'));

    
    // highlightjs
    gulp.src('./node_modules/highlightjs/styles/*.css').pipe(gulp.dest('./src/assets/plugins/highlightjs/styles'));
    gulp.src('./node_modules/highlightjs/highlight.pack.min.js').pipe(gulp.dest('./src/assets/plugins/highlightjs/'));
});


//prefix css for browser support
gulp.task('prefix_css', function () {
    // Set the browser that you want to have support
    const AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];
    
    const plugins = [
        autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }),
        cssnano()
    ];

    return gulp.src('./src/main/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/main/css/'));
});