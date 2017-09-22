/**
 * 
 * 2. JS合并 压缩 混淆
 * 3. img复制
 * 4. html压缩
 */

// 1. LESS编译 压缩 合并
var gulp = require('gulp');
var less = require('gulp-less');
var css = require('gulp-mini-css');

gulp.task('style',function () {
	gulp.src('src/styles/*.less')
	.pipe(less())
	.pipe(css({ext:'-min.css'}))
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

// 2. JS合并 压缩 混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('script',function () {
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

//3. img复制
gulp.task('img',function () {
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

// 4. html压缩
var htmlmin = require('gulp-htmlmin');

gulp.task('html',function () {
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({
      stream: true
    }));
});


var browserSync = require('browser-sync');
gulp.task('serve', function() {
	browserSync({
		server: {
     		baseDir: ['dist']
    },
	}, function(err, bs) {
		console.log(bs.options.getIn(["urls", "local"]));
	});

	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['img']);
	gulp.watch('src/*.html',['html']);
});