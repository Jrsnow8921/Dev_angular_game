var _ = require('lodash'),
    args = require('yargs').argv,
    autoprefixer = require('gulp-autoprefixer'),
    cache = require('gulp-cache'),
    cleanhtml = require('gulp-cleanhtml'),
    closureCompiler = require('gulp-closure-compiler'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    env = require('./client/config/environments.js'),
    flatten = require('gulp-flatten'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    inject = require('gulp-inject'),
    jshint = require('gulp-jshint'),
    karma = require('karma').server,
    karmaCommonConf = require('./client/config/karma-common-conf.js'),
    merge = require('merge-stream'),
    minifyCss = require('gulp-minify-css'),
    nib = require('nib'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    runSequence = require('run-sequence'),
    streamqueue = require('streamqueue'),
    stylish = require('jshint-stylish'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

var settings = {
  env: env[args.env] || env.dev,
  folders: {
    dist: './public',
    images: './public/images',
    fonts: './public/fonts',
    script: './public/script',
    style: './public/style',
    views: './public/views'
  },
  globs: {
    compileScript: [
      './client/app/**/*.js',
      '!./client/app/**/*_test.js',
      './bower_components/closure-library/closure/goog/**/*.js'
    ],
    html: ['./client/app/**/*.html', '!./client/app/index.html'],
    htmlIndex: './client/app/index.html',
    images: ['./client/app/**/*.png', './client/app/**/*.svg'],
    lib: [
      './bower_components/angular/angular.js',
      './bower_components/angular-route/angular-route.js',
      './bower_components/angular-touch/angular-touch.js',
      './bower_components/jquery/dist/jquery.js'
    ],
    refresh: ['./public/**/*.*', './client/coverage/**/*.html'],
    script: ['./client/app/**/*.js', '!./client/app/**/*_test.js'],
    rootStyle: ['./client/app/app.styl'],
    styles: './client/app/**/*.styl',
    test: './client/app/**/*_test.js',
    package: './client/package/*.*',
    fonts: './client/fonts/**/*.*'
  },
  output: {
    libFile: './script/lib.js',
    scriptFile: './script/app.js',
    styleFile: './style/app.css',
    script: ['./public/script/lib.js', './public/script/app.js'],
    style: './public/style/app.css'
  },
  images: {
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
  },
  inject: {
    addRootSlash: false,
    ignorePath: '../../public',
    relative: true
  }
};

var forceContinue = false;

function continueOnError(error) {
  gutil.log(error ? error.message : 'error');
  this.emit('end');
}

gulp.task('package', function() {
  return gulp.src(settings.globs.package)
    .pipe(gulp.dest(settings.folders.dist));
});

gulp.task('fonts', function() {
  return gulp.src(settings.globs.fonts)
    .pipe(gulp.dest(settings.folders.fonts));
});

gulp.task('styles', function() {
  return gulp.src(settings.globs.rootStyle)
    .pipe(stylus())
    .pipe(plumber())
    .pipe(concat(settings.output.styleFile))
      //.pipe(autoprefixer('last 2 Chrome versions'))
    .pipe(gulpif(settings.env.minifyCss, minifyCss()))
    .pipe(rename(settings.output.styleFile))
    .pipe(gulp.dest(settings.folders.dist));
});

gulp.task('html', ['styles', 'scripts'], function() {
  var views = gulp.src(settings.globs.html)
      .pipe(gulpif(settings.env.cleanHtml, cleanhtml()))
      .pipe(gulp.dest(settings.folders.views));

  var index = gulp.src(settings.globs.htmlIndex)
      .pipe(inject(
          gulp.src(settings.output.style, {read: false}), settings.inject))
      .pipe(inject(
          gulp.src(settings.output.script, {read: false}), settings.inject))
      .pipe(gulpif(settings.env.cleanHtml, cleanhtml()))
      .pipe(gulp.dest(settings.folders.dist));

  return merge(views, index);
});

gulp.task('images', function() {
  return gulp.src(settings.globs.images)
    .pipe(imagemin(settings.images))
    .pipe(flatten())
    .pipe(gulp.dest(settings.folders.images));
});

gulp.task('lib', function() {
  return gulp.src(settings.globs.lib)
    .pipe(concat('temp.js'))
    .pipe(rename(settings.output.libFile))
    .pipe(gulpif(settings.env.minifyCss, uglify()))
    .pipe(gulp.dest(settings.folders.dist));
});

gulp.task('validate_scripts', function() {
  return gulp.src(settings.globs.script)
    .pipe(jshint('./client/config/.jshintrc.src'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('scripts', ['validate_scripts'], function() {
  return gulp.src(settings.globs.compileScript)
    .pipe(gulpif(forceContinue, plumber({errorHandler: continueOnError})))
    .pipe(closureCompiler({
        compilerPath: 'bower_components/closure-compiler/compiler.jar',
        fileName: 'compiled.js',
        compilerFlags: {
          closure_entry_point: 'app',
          compilation_level: settings.env.compilationLevel,
          formatting: settings.env.formatting,
          define: [
            'goog.DEBUG=false'
          ],
          externs: [
            './client/externs/angular-1.3.js'
          ],
          jscomp_error: [
            'checkTypes'
          ],
          only_closure_dependencies: true,
          manage_closure_dependencies: true,
          warning_level: 'VERBOSE',
          generate_exports: true,
          angular_pass: true,
          language_in: 'ECMASCRIPT5_STRICT',
          tracer_mode: 'OFF'
        }
      }))
    .pipe(rename(settings.output.scriptFile))
    .pipe(gulp.dest(settings.folders.dist));
});

gulp.task('validate_tests', function() {
  return gulp.src(settings.globs.test)
    .pipe(jshint('./client/config/.jshintrc.test'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('tests', ['validate_tests'], function(done) {
  karma.start(_.assign({}, karmaCommonConf, {singleRun: true}), done);
});

gulp.task('clean_dist', function(done) {
  return gulp.src(settings.folders.dist, {read: false})
    .pipe(rimraf(done));
});

gulp.task('dev_server', function() {
  connect.server({
    port: 8001,
    livereload: false
  });
});

gulp.task('refresh', function() {
  gulp.src(settings.globs.refresh)
    .pipe(watch())
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(settings.globs.script, ['tests', 'scripts']);
  gulp.watch(settings.globs.test, ['tests']);
  gulp.watch(settings.globs.styles, ['styles']);

  watch({glob: settings.globs.html})
      .pipe(gulpif(settings.env.cleanHtml, cleanhtml()))
      .pipe(gulp.dest(settings.folders.views));

  watch({glob: settings.globs.htmlIndex})
      .pipe(inject(
          gulp.src(settings.output.style, {read: false}), settings.inject))
      .pipe(inject(
          gulp.src(settings.output.script, {read: false}), settings.inject))
      .pipe(gulpif(settings.env.cleanHtml, cleanhtml()))
      .pipe(gulp.dest(settings.folders.dist));

  watch({glob: settings.globs.images})
    .pipe(cache(imagemin(settings.images)))
    .pipe(flatten())
    .pipe(gulp.dest(settings.folders.images));
});

gulp.task('build', function(done) {
  forceContinue = false;
  runSequence(
      'tests',
      'clean_dist',
      ['html', 'images', 'lib', 'fonts', 'package'],
      function() {
        forceContinue = true;
        done();
      });
});

gulp.task('default', function() {
  runSequence(
      'build',
      'dev_server',
      'refresh',
      'watch');
});
