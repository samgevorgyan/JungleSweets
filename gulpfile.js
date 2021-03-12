var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprites');
var del = require('del');

/// Define used path
var svgPath = {
  src: 'src/assets/img/',
  dest: 'src/assets/img/sprite/',
  sprite: 'sprite.svg',
  // Files to exclude from sprite
  exclude: []
};

svgPath.exclude = svgPath.exclude.map(svg => '!' + svgPath.src + svg);

/// svg.gensprite : generate the sprite from the minified svg

gulp.task('svg.gensprite', function() {
  // Filter a subset of the files
  return gulp
    .src([svgPath.src + '**/*.svg'].concat(svgPath.exclude))
    .pipe(
      svgSprite({
        mode: 'symbols',
        svg: {
          symbols: svgPath.sprite
        }
      })
    )
    .pipe(gulp.dest(svgPath.dest));
});



/// Cleaning task
gulp.task('svg.clean', function() {
  return del([svgPath.dest]);
});

/// svg : main task (minify + gen sprite)
gulp.task('svg', gulp.series('svg.clean', 'svg.gensprite'));
