var gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	replace = require('gulp-replace'),
	merge = require('merge2'),
	uglifiy = require('gulp-uglify'),
	jasmine = require('gulp-jasmine'),
	ts = require('gulp-typescript');

var REFERENCE_REPLACE_REGEX = /^\s*\/\/\/\s*<\s*reference\s*path\s*=\s*".*"\s*\/>\s*/mg;

var DIST_FOLDER = 'src-dist'
var SRC_FILES_EXPR = 'src/*.ts'
var TEST_FILES_EXPR = 'src-test/*.ts'
var TEST_JASMINE = 'src-test/jasmine.d.ts'

var TS_CONCAT_SRC_FILE = 'tsf.ts'
var TS_CONCAT_DEF_SRC_FILE = 'tsf.d.ts'
var TS_CONCAT_TESTS_FILE = 'tsf-tests.ts'

var JS_MIN_SRC_FILE = 'tsf-min.js'
var JS_SRC_FILE = 'tsf.js'
var JS_TESTS_FILE = 'tsf-tests.js'

var tsSourceCompiler = ts({
	noImplicitAny: true,
	declaration: true,
	out: JS_SRC_FILE,
	outFile: JS_SRC_FILE
});

var tsTestCompiler = ts({
	removeComments: true,
	out: JS_TESTS_FILE,
	outFile: JS_TESTS_FILE
});

gulp.task('concat-src', function () {
	return gulp.src(SRC_FILES_EXPR)
		.pipe(concat(TS_CONCAT_SRC_FILE))
		.pipe(replace(REFERENCE_REPLACE_REGEX, ''))
		.pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('concat-tests', function () {
	return gulp.src([TEST_JASMINE, TEST_FILES_EXPR])
		.pipe(concat(TS_CONCAT_TESTS_FILE))
		.pipe(replace(/^\s*\/\/\/\s*<\s*reference\s*path\s*=\s*".*"\s*\/>\s*/mg, ''))
		.pipe(gulp.dest(DIST_FOLDER));
})

gulp.task('compile', ['concat-src', 'concat-tests'], function () {
	var srcPath = DIST_FOLDER + '/' + TS_CONCAT_SRC_FILE;
	var testPath = DIST_FOLDER + '/' + TS_CONCAT_TESTS_FILE;

	var srcResult = gulp.src(srcPath).pipe(tsSourceCompiler);
	var testResult = gulp.src([srcPath, testPath]).pipe(tsTestCompiler);

	return merge([
    srcResult.dts.pipe(gulp.dest(DIST_FOLDER)),
    srcResult.js.pipe(gulp.dest(DIST_FOLDER)),
		testResult.js.pipe(gulp.dest(DIST_FOLDER))
	]);
})

gulp.task('minify', ['compile'], function () {
	return gulp.src(DIST_FOLDER + '/' + JS_SRC_FILE)
		.pipe(jasmine());
})

gulp.task('test', ['compile'], function () {
	return gulp.src(DIST_FOLDER + '/' + JS_TESTS_FILE)
		.pipe(concat(JS_MIN_SRC_FILE)) // to have the desired filename
		.pipe(uglifiy())
		.pipe(gulp.dest(DIST_FOLDER));
})

gulp.task('default', ['minify'], function (input) {
	return input;
});