/*
Commands to make dist and ready to use

=> Before starting project
    1. gulp build_plugins
    2. gulp quixnav_js


=> After project completion
    1. gulp copy_dist
    2. gulp make_package
    3. gulp add_comment
    4. gulp js_obfuscate

*/


const {src, dest, series} = require('gulp');
const concat = require('gulp-concat');
const headerComment = require('gulp-header-comment');
const autoprefixer = require('autoprefixer');
const javascriptObfuscator = require('gulp-javascript-obfuscator');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps   = require('gulp-sourcemaps');


// File Copy
function build_plugins() {
    // Jquery
    src('./node_modules/jquery/dist/jquery.min.js').pipe(dest('./src/vendor/jquery/'));

    // Bootstrap
    src('node_modules/bootstrap/scss/**/*').pipe(dest('./src/vendor/bootstrap/scss/'));
    src('node_modules/bootstrap/dist/css/bootstrap.min.css').pipe(dest('./src/vendor/bootstrap/dist/css/'));
    src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js').pipe(dest('./src/vendor/bootstrap/dist/js/'));

    // Bootstrap rtl
    src('node_modules/bootstrap-v4-rtl/scss/**/*').pipe(dest('./src/vendor/bootstrap-v4-rtl/scss/'));

    // Animate.css
    src('node_modules/animate.css/animate.min.css').pipe(dest('./src/vendor/animate/'));

    // MetisMenu
    src('node_modules/metismenu/dist/metisMenu.min.css').pipe(dest('./src/vendor/metismenu/css/'));
    src('node_modules/metismenu/dist/metisMenu.min.js').pipe(dest('./src/vendor/metismenu/js/'));
    
    // Jquery Slimscroll
    src('node_modules/jquery-slimscroll/jquery.slimscroll.min.js').pipe(dest('./src/vendor/jquery-slimscroll/'));

    
    // highlightjs
    src('./node_modules/highlightjs/styles/*.css').pipe(dest('./src/vendor/highlightjs/styles'));
    src('./node_modules/highlightjs/highlight.pack.min.js').pipe(dest('./src/vendor/highlightjs/'));
}

//make common js 
function quixnav_js() {
    return src(['./src/vendor/metismenu/js/metisMenu.min.js',
            './src/js/settings.js'
        ])
        .pipe(concat('quixnav.min.js'))
        .pipe(dest('./src/vendor/quixnav/'));
};

function html_comments() {
    return src('./src/*.html')
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
    .pipe(dest('./dist/'))
    .pipe(dest('./package/QuixNav/src/'))
};

function css_comments() {
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

    return src('./src/css/*.css')
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
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/css/'))
    .pipe(dest('./package/QuixNav/src/css/'))
};

function js_comments() {
    return src('./src/js/**/*.js')
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
    .pipe(dest('./dist/js/'))
    .pipe(dest('./package/QuixNav/src/js/'))
};

function copy_dist(){
    return src('./src/**/*').pipe(dest('./dist/'));
};

function make_package(cb){
    src('./src/**/*').pipe(dest('./package/QuixNav/src/'));
    src('./documentation/**/*').pipe(dest('./package/documentation/'));
    src('./package.json').pipe(dest('./package/QuixNav/'));
    src('./userGulp/gulpfile.js').pipe(dest('./package/QuixNav/'));
    cb();
};

function js_obfuscate() {

    //main
    return src('./dist/js/*')
    .pipe(javascriptObfuscator())
    .pipe(dest('./dist/js/'));

};

function add_comment() {
    return series(html_comments, css_comments);
}

exports.build_plugins = build_plugins;
exports.quixnav_js = quixnav_js;
exports.copy_dist = copy_dist;
exports.make_package = make_package;
exports.html_comments = html_comments;
exports.css_comments = css_comments;
exports.js_comments = js_comments;
exports.js_obfuscate = js_obfuscate;
exports.add_comment = add_comment;