// REQUIRES //
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var jsmin = require('gulp-jsmin');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

// PATH VARIABLES //
var source = './source/';
var destination = './public/';

var index_source = '';
var index_sources = 'index.php';

var html_source = '';
var html_views_source = 'views/';
var html_sources = '**/*.html';

var php_source = 'php/';
var php_sources = '**/*.php';
var php_destination = 'php/';

var sass_source = 'sass/';
var sass_sources = '**/*.scss';
var sass_destination = 'stylesheets/';

var scripts_source = 'scripts/';
var scripts_sources = '*.js';
var scripts_destination = 'scripts/';

// BUILD TASKS //
gulp.task('index', function() {
	return gulp.src(source + index_source + index_sources)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(destination))
		.pipe(livereload());
});

gulp.task('html', function() {
	return gulp.src(source + html_source + html_sources)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(destination))
		.pipe(livereload());
});

gulp.task('php', function() {
	return gulp.src(source + php_source + php_sources)
		.pipe(gulp.dest(destination + php_destination))
		.pipe(livereload());
});

gulp.task('sass', function() {
	return gulp.src(source + sass_source + 'pages/' + sass_sources)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(destination + sass_destination))
		.pipe(livereload());
});

gulp.task('javascript', function() {
	return gulp.src(source + scripts_source + scripts_sources)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jsmin())
		.pipe(concat('index.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(destination + scripts_destination))
		.pipe(livereload());
});

// CLEAN TASKS //
gulp.task('clean-index', function() {
	return gulp.src(destination + index_sources)
		.pipe(clean());
});

gulp.task('clean-html', function() {
	return gulp.src([	destination + html_source + html_sources,
										destination + html_source + html_views_source])
		.pipe(clean());
});

gulp.task('clean-php', function() {
	return gulp.src(destination + php_destination)
		.pipe(clean());
});

gulp.task('clean-sass', function() {
	return gulp.src(destination + sass_destination)
		.pipe(clean());
});

gulp.task('clean-scripts', function() {
	return gulp.src(destination + scripts_destination)
		.pipe(clean());
});

// OTHER TASKS //
gulp.task('watch-daemon', function() {
	livereload.listen();

	gulp.watch(source + index_source + index_sources, ['index']);
	gulp.watch(source + html_source + html_sources, ['html']);
	gulp.watch(source + php_source + php_sources, ['php']);
	gulp.watch(source + sass_source + sass_sources, ['sass']);
	gulp.watch(source + scripts_source + scripts_sources, ['javascript']);
});

gulp.task('default', ['index', 'html', 'php', 'sass', 'javascript']);
gulp.task('watch', ['default', 'watch-daemon']);
gulp.task('clean', ['clean-index', 'clean-html', 'clean-php', 'clean-sass', 'clean-scripts']);