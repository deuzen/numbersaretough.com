'use strict';

const gulp = require('gulp');
const semanticBuild = require('./app/vendor/semantic/tasks/build');
const semanticClean = require('./app/vendor/semantic/tasks/clean');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const del = require('del');
const eslint = require('gulp-eslint');

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
  runSequence('lint', 'html', 'browser-sync');

  gulp.watch('app/index.html', () => {
    runSequence('html', 'reload', callback);
  });
});
