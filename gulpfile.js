const gulp = require('gulp');
const concat = require('gulp-concat');
const headerComment = require('gulp-header-comment');
const autoprefixer = require('autoprefixer');
const csso = require('csso');
const javascriptObfuscator = require('gulp-javascript-obfuscator');
const runSequence = require('run-sequence');



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
    .pipe(gulp.dest('./../../../Documents/Package/Matex/main/template/'))
    .pipe(gulp.dest('./../../../Documents/Matex/boxed/main/template/'))
    .pipe(gulp.dest('./../../../Documents/Matex/compact/main/template/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/main/template/'))
    .pipe(gulp.dest('./../../../Documents/Matex/horizontal/main/template/'))
    .pipe(gulp.dest('./../../../Documents/Matex/mini/main/template/'))
    .pipe(gulp.dest('./../../../Documents/Matex/rtl/main/template/'))
    .pipe(gulp.dest('./../../../Documents/Matex/wide-boxed/main/template/'))
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
    .pipe(csso())
    .pipe(gulp.dest('./../../../Documents/Package/Matex/main/css/'))
    .pipe(gulp.dest('./../../../Documents/Matex/boxed/main/css/'))
    .pipe(gulp.dest('./../../../Documents/Matex/compact/main/css/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/main/css/'))
    .pipe(gulp.dest('./../../../Documents/Matex/horizontal/main/css/'))
    .pipe(gulp.dest('./../../../Documents/Matex/mini/main/css/'))
    .pipe(gulp.dest('./../../../Documents/Matex/rtl/main/css/'))
    .pipe(gulp.dest('./../../../Documents/Matex/wide-boxed/main/css/'))
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
    .pipe(gulp.dest('./../../../Documents/Package/Matex/main/js/'))
    .pipe(gulp.dest('./../../../Documents/Matex/boxed/main/js/'))
    .pipe(gulp.dest('./../../../Documents/Matex/compact/main/js/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/main/js/'))
    .pipe(gulp.dest('./../../../Documents/Matex/horizontal/main/js/'))
    .pipe(gulp.dest('./../../../Documents/Matex/mini/main/js/'))
    .pipe(gulp.dest('./../../../Documents/Matex/rtl/main/js/'))
    .pipe(gulp.dest('./../../../Documents/Matex/wide-boxed/main/js/'))
});


/////////////////////
//task for dist
///////////////////
gulp.task('copy_dist', function(){
    gulp.src('./src/**/*').pipe(gulp.dest('./../../../Documents/Matex/demo/'));
    gulp.src('./landing-page/**/*').pipe(gulp.dest('./../../../Documents/Matex/landing-page/'));
    gulp.src('./documentation/**/*').pipe(gulp.dest('./../../../Documents/Matex/documentation/'));
});


gulp.task('copy_versions', function(){
    gulp.src('./src/main/**/*')
    .pipe(gulp.dest('./../../../Documents/Matex/demo/horizontal/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/mini/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/compact/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/overlay/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/boxed/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/wide-boxed/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/rtl/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-horizontal/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-full/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-mini/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-compact/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-overlay/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-boxed/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-wide-boxed/'))
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-rtl/'))
});

// // HTML Minify
gulp.task('html_minify', function() {
    return gulp.src('./src/main/template/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./../../../Documents/Matex/boxed/main/template/'))
        .pipe(gulp.dest('./../../../Documents/Matex/compact/main/template/'))
        .pipe(gulp.dest('./../../../Documents/Matex/demo/main/template/'))
        .pipe(gulp.dest('./../../../Documents/Matex/horizontal/main/template/'))
        .pipe(gulp.dest('./../../../Documents/Matex/mini/main/template/'))
        .pipe(gulp.dest('./../../../Documents/Matex/rtl/main/template/'))
        .pipe(gulp.dest('./../../../Documents/Matex/wide-boxed/main/template/'))
});

// Gulp task to minify CSS files
gulp.task('css_minify', function () {
    return gulp.src('./src/main/css/style.css')
      .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      .pipe(csso())
      .pipe(gulp.dest('./../../../Documents/Matex/boxed/main/css/'))
      .pipe(gulp.dest('./../../../Documents/Matex/compact/main/css/'))
      .pipe(gulp.dest('./../../../Documents/Matex/demo/main/css/'))
      .pipe(gulp.dest('./../../../Documents/Matex/horizontal/main/css/'))
      .pipe(gulp.dest('./../../../Documents/Matex/mini/main/css/'))
      .pipe(gulp.dest('./../../../Documents/Matex/rtl/main/css/'))
      .pipe(gulp.dest('./../../../Documents/Matex/wide-boxed/main/css/'))
});


// Gulp task to minify all files
gulp.task('minify', function () {
  runSequence(
    'html_minify',
    'css_minify'
  );
});

gulp.task('js_obfuscate', function() {

    //main
    gulp.src('./../../../Documents/Matex/demo/main/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/main/js/'));   

    gulp.src('./../../../Documents/Matex/demo/main/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/main/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/main/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/main/js/plugins-init/'));
    

    //boxed
    gulp.src('./../../../Documents/Matex/demo/boxed/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/boxed/js/'));   

    gulp.src('./../../../Documents/Matex/demo/boxed/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/boxed/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/boxed/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/boxed/js/plugins-init/'));
    
    

    //Compact
    gulp.src('./../../../Documents/Matex/demo/compact/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/compact/js/'));   

    gulp.src('./../../../Documents/Matex/demo/compact/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/compact/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/compact/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/compact/js/plugins-init/'));
    
    

    //mini
    gulp.src('./../../../Documents/Matex/demo/mini/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/mini/js/'));   

    gulp.src('./../../../Documents/Matex/demo/mini/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/mini/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/mini/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/mini/js/plugins-init/'));
    
    

    //overlay
    gulp.src('./../../../Documents/Matex/demo/overlay/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/overlay/js/'));   

    gulp.src('./../../../Documents/Matex/demo/overlay/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/overlay/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/overlay/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/overlay/js/plugins-init/'));
    
    

    //horizontal
    gulp.src('./../../../Documents/Matex/demo/horizontal/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/horizontal/js/'));   

    gulp.src('./../../../Documents/Matex/demo/horizontal/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/horizontal/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/horizontal/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/horizontal/js/plugins-init/'));
    
    

    //rtl
    gulp.src('./../../../Documents/Matex/demo/rtl/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/rtl/js/'));   

    gulp.src('./../../../Documents/Matex/demo/rtl/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/rtl/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/rtl/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/rtl/js/plugins-init/'));
    

    //dark-full
    gulp.src('./../../../Documents/Matex/demo/dark-full/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-full/js/'));   

    gulp.src('./../../../Documents/Matex/demo/dark-full/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-full/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/dark-full/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-full/js/plugins-init/'));
    

    //dark-boxed
    gulp.src('./../../../Documents/Matex/demo/dark-boxed/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-boxed/js/'));   

    gulp.src('./../../../Documents/Matex/demo/dark-boxed/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-boxed/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/dark-boxed/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-boxed/js/plugins-init/'));
    
    

    //dark-Compact
    gulp.src('./../../../Documents/Matex/demo/dark-compact/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-compact/js/'));   

    gulp.src('./../../../Documents/Matex/demo/dark-compact/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-compact/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/dark-compact/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-compact/js/plugins-init/'));
    
    

    //dark-mini
    gulp.src('./../../../Documents/Matex/demo/dark-mini/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-mini/js/'));   

    gulp.src('./../../../Documents/Matex/demo/dark-mini/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-mini/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/dark-mini/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-mini/js/plugins-init/'));
    
    

    //dark-overlay
    gulp.src('./../../../Documents/Matex/demo/dark-overlay/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-overlay/js/'));   

    gulp.src('./../../../Documents/Matex/demo/dark-overlay/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-overlay/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/dark-overlay/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-overlay/js/plugins-init/'));
    
    

    //dark-horizontal
    gulp.src('./../../../Documents/Matex/demo/dark-horizontal/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-horizontal/js/'));   

    gulp.src('./../../../Documents/Matex/demo/dark-horizontal/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-horizontal/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/dark-horizontal/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-horizontal/js/plugins-init/'));
    
    

    //dark-rtl
    gulp.src('./../../../Documents/Matex/demo/dark-rtl/js/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-rtl/js/'));   

    gulp.src('./../../../Documents/Matex/demo/dark-rtl/js/dashboard/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-rtl/js/dashboard/'));    

    gulp.src('./../../../Documents/Matex/demo/dark-rtl/js/plugins-init/*')
    .pipe(javascriptObfuscator())
    .pipe(gulp.dest('./../../../Documents/Matex/demo/dark-rtl/js/plugins-init/'));
    

});


/////////////////////
//tasks for package
////////////////////

gulp.task('package', function(){
    gulp.src('./src/**/*').pipe(gulp.dest('./../../../Documents/Package/Matex/'));
    gulp.src('./package.json').pipe(gulp.dest('./../../../Documents/Package/'));
    gulp.src('./gulp-package/gulpfile.js').pipe(gulp.dest('./../../../Documents/Package/'));
    gulp.src('./documentation/**/*').pipe(gulp.dest('./../../../Documents/Package/documentation/'));
});

/////////////////////
//tasks for package
////////////////////

gulp.task('img_placeholder', function(){
    gulp.src('./images/**/*').pipe(gulp.dest('./../../../Documents/Package/Matex/assets/images/'));
});



//plugin + common_js
gulp.task('make_scripts', ['plugin', 'common_js']);


//make dist
gulp.task('make_dist', ['copy_dist'], function() {
    runSequence(
        'copy_versions'
    );
});


gulp.task('make_package', ['package'], function() {
    runSequence(
        'html_comments',
        'css_comments'
    );
})


gulp.task('add_comment', ['html_comments', 'css_comments', 'js_comments']);
