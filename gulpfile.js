const gulp = require('gulp');
const semanticBuild = require('./app/vendor/semantic/tasks/build');
const semanticClean = require('./app/vendor/semantic/tasks/clean');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const del = require('del');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

/*--------------
   Semantic UI
---------------*/

gulp.task('semantic:build', semanticBuild);
gulp.task('semantic:cleanDist', semanticClean);
gulp.task('semantic:cleanBuild', () => del('build/assets/semantic'));
gulp.task('semantic', (callback) => {
  runSequence(['semantic:cleanDist', 'semantic:cleanBuild'], 'semantic:build', callback);
});

/*--------------
      HTML
---------------*/

gulp.task('html', () => {
  gulp.src('app/index.html')
    .pipe(gulp.dest('build/'));
});

/*--------------
   javascript
---------------*/

gulp.task('lint', () =>
  gulp.src(['app/js/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('webpack', () =>
  gulp.src('app/js/main.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('build/js'))
);

/*--------------
       css
---------------*/

gulp.task('css', () =>
  gulp.src('app/css/**/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build/css'))
);

/*--------------
     clean
---------------*/

gulp.task('clean', () =>
  del(['build/js', 'build/css', 'build/*.html'])
);

/*--------------
  browser-sync
---------------*/

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: 'build',
    },
  });
});

gulp.task('reload', () => {
  browserSync.reload();
});

/*--------------
     default
---------------*/

gulp.task('default', (callback) => {
  runSequence('clean', 'lint', ['webpack', 'html', 'css'], 'browser-sync');

  gulp.watch('app/index.html', () => {
    runSequence('html', 'reload', callback);
  });
});
