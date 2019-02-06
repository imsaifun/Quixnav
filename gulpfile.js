const gulp = require('gulp');
const concat = require('gulp-concat');
const headerComment = require('gulp-header-comment');
const autoprefixer = require('autoprefixer');
const javascriptObfuscator = require('gulp-javascript-obfuscator');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps   = require('gulp-sourcemaps');


// File Copy
gulp.task('plugin', function() {
    // Jquery
    gulp.src('./node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('./src/assets/plugins/jquery/'));

    // Bootstrap
    gulp.src('node_modules/bootstrap/scss/*.scss').pipe(gulp.dest('./src/assets/plugins/bootstrap/scss/'));
    gulp.src('node_modules/bootstrap/scss/mixins/*.scss').pipe(gulp.dest('./src/assets/plugins/bootstrap/scss/mixins/'));
    gulp.src('node_modules/bootstrap/scss/utilities/*.scss').pipe(gulp.dest('./src/assets/plugins/bootstrap/scss/utilities/'));
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js').pipe(gulp.dest('./src/assets/plugins/bootstrap/js/'));

    // Bootstrap rtl
    gulp.src('node_modules/bootstrap-v4-rtl/scss/*.scss').pipe(gulp.dest('./src/assets/plugins/bootstrap-v4-rtl/scss/'));
    gulp.src('node_modules/bootstrap-v4-rtl/scss/mixins/*.scss').pipe(gulp.dest('./src/assets/plugins/bootstrap-v4-rtl/scss/mixins/'));
    gulp.src('node_modules/bootstrap-v4-rtl/scss/utilities/*.scss').pipe(gulp.dest('./src/assets/plugins/bootstrap-v4-rtl/scss/utilities/'));

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

//make common js 
gulp.task('common_js', function() {
    return gulp.src(['./src/assets/plugins/jquery/jquery.min.js',
            './src/assets/plugins/bootstrap/js/bootstrap.bundle.min.js',
            './src/assets/plugins/metismenu/js/metisMenu.min.js',
            './src/assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js'
        ])
        .pipe(concat('common.min.js'))
        .pipe(gulp.dest('./src/assets/plugins/common/'));
});

gulp.task('html_comments', function() {
    return gulp.src('./src/main/template/*.html')
    .pipe(headerComment(`
    **************************************************
    ******* Name: <%= pkg.name %>
    ******* Description: <%= pkg.description %>
    ******* Version: <%= pkg.version %>
    ******* Released on <%= moment().format('YYYY-MM-DD HH:mm:ss') %>
    ******* Support Email : <%= pkg.email %>
    ******* Support Skype : <%= pkg.skype %>
    ******* Development/Code Author: <%= pkg.author %>
    ******* Author URL: <%= pkg.authorUrl %>
    ******* Themeforest URL (Development): <%= pkg.authorTfUrl %>
    ******* Design Author: <%= pkg.design %>
    ******* License: <%= pkg.license %>
    ***************************************************
    `))
    .pipe(gulp.dest('./dist/main/template/'))
});

gulp.task('css_comments', function() {
    return gulp.src('./src/main/css/*.css')
    .pipe(headerComment(`
        **************************************************
        ******* Name: <%= pkg.name %>
        ******* Description: <%= pkg.description %>
        ******* Version: <%= pkg.version %>
        ******* Released on <%= moment().format('YYYY-MM-DD HH:mm:ss') %>
        ******* Support Email : <%= pkg.email %>
        ******* Support Skype : <%= pkg.skype %>
        ******* Development/Code Author: <%= pkg.author %>
        ******* Author URL: <%= pkg.authorUrl %>
        ******* Themeforest URL (Development): <%= pkg.authorTfUrl %>
        ******* Design Author: <%= pkg.design %>
        ******* License: <%= pkg.license %>
        ***************************************************
    `))
    .pipe(gulp.dest('./dist/main/css/'))
});

gulp.task('js_comments', function() {
    return gulp.src('./src/main/js/**/*.js')
    .pipe(headerComment(`
    **************************************************
    ******* Name: <%= pkg.name %>
    ******* Description: <%= pkg.description %>
    ******* Version: <%= pkg.version %>
    ******* Released on <%= moment().format('YYYY-MM-DD HH:mm:ss') %>
    ******* Support Email : <%= pkg.email %>
    ******* Support Skype : <%= pkg.skype %>
    ******* Development/Code Author: <%= pkg.author %>
    ******* Author URL: <%= pkg.authorUrl %>
    ******* Themeforest URL (Development): <%= pkg.authorTfUrl %>
    ******* Design Author: <%= pkg.design %>
    ******* License: <%= pkg.license %>
    ***************************************************
    `))
    .pipe(gulp.dest('./dist/main/js/'))
});


gulp.task('copy_dist', function(){
    gulp.src('./src/**/*').pipe(gulp.dest('./dist/'));
});

gulp.task('make_package', function(){
    gulp.src('./src/**/*').pipe(gulp.dest('./package/QuixNav/'));
    gulp.src('./documentation/**/*').pipe(gulp.dest('./package/documentation/'));
    gulp.src('./package.json').pipe(gulp.dest('./package/QuixNav/'));
    gulp.src('./userGulp/gulpfile.js').pipe(gulp.dest('./package/QuixNav/'));
});

gulp.task('js_obfuscate', function() {

    //main
    gulp.src('./dist/main/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./dist/main/js/'));

});



//prefix css for browser support
// Set the browser that you want to support
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

gulp.task('prefix_css', function () {
    const plugins = [
        autoprefixer({browsers: AUTOPREFIXER_BROWSERS}),
        cssnano()
    ];

    return gulp.src('./src/main/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/main/css/'));
});



//add comment
gulp.task('add_comment', ['html_comments', 'css_comments', 'js_comments']);




/*
Commands to make dist and ready to use

    => Before starting project
        1. gulp plugin
        2. gulp common_js


    => After project completion
        1. gulp copy_dist
        2. gulp make_package
        3. gulp add_comment
        4. gulp prefix_css

*/