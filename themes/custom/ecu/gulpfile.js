let gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  sassGlob = require('gulp-sass-glob'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync').create();

const paths = {
  scss: {

    bootstrap: './node_modules/bootstrap/scss/bootstrap.scss',
    srcBase: './smacss/base/style.scss',
    destBase: './smacss/base',
    srcLayout: './smacss/layout/*.scss',
    destLayout: './smacss/layout',
    srcTheme: './smacss/theme/*.scss',
    destTheme: './smacss/theme'
  },
  js: {
    bootstrap: './node_modules/bootstrap/dist/js/bootstrap.min.js',
    jquery: './node_modules/jquery/dist/jquery.min.js',
    popper: 'node_modules/popper.js/dist/umd/popper.min.js',
    dest: './js'
  }
};

// Compile base into CSS & auto-inject into browsers
function baseStyles () {
  return gulp.src([paths.scss.bootstrap, paths.scss.srcBase],{ allowEmpty: true })
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: [
        'Chrome >= 35',
        'Firefox >= 38',
        'Edge >= 12',
        'Explorer >= 10',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12']
    })]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scss.destBase))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scss.destBase))
    .pipe(browserSync.stream());
}

// Compile layout into CSS & auto-inject into browsers
function layoutStyles () {
  return gulp.src([paths.scss.bootstrap, paths.scss.srcLayout],{ allowEmpty: true })
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: [
        'Chrome >= 35',
        'Firefox >= 38',
        'Edge >= 12',
        'Explorer >= 10',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12']
    })]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scss.destLayout))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scss.destLayout))
    .pipe(browserSync.stream());
}

// Compile sass into CSS & auto-inject into browsers
// function styles () {
//   return gulp.src([paths.scss.bootstrap, paths.scss.src],{ allowEmpty: true })
//     .pipe(sassGlob())
//     .pipe(sourcemaps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(postcss([autoprefixer({
//       browsers: [
//         'Chrome >= 35',
//         'Firefox >= 38',
//         'Edge >= 12',
//         'Explorer >= 10',
//         'iOS >= 8',
//         'Safari >= 8',
//         'Android 2.3',
//         'Android >= 4',
//         'Opera >= 12']
//     })]))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(paths.scss.dest))
//     .pipe(cleanCss())
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest(paths.scss.dest))
//     .pipe(browserSync.stream())
// }

// Compile sass into CSS & auto-inject into browsers
function themeStyles () {
  return gulp.src([paths.scss.bootstrap, paths.scss.srcTheme],{ allowEmpty: true })
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: [
        'Chrome >= 35',
        'Firefox >= 38',
        'Edge >= 12',
        'Explorer >= 10',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12']
    })]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scss.destTheme))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scss.destTheme))
    .pipe(browserSync.stream());
}

// Move the javascript files into our js folder
function js () {
  return gulp.src([paths.js.bootstrap, paths.js.jquery, paths.js.popper], { allowEmpty: true })
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// exports.styles = styles;
exports.styles = baseStyles;
exports.js = js;
exports.sass = gulp.series(js, baseStyles, layoutStyles, themeStyles);
