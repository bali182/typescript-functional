var gulp = require('gulp'),
	concat = require('gulp-concat'),
	replace = require('gulp-replace'),
	merge = require('merge2'),
	uglifiy = require('gulp-uglify'),
	jasmine = require('gulp-jasmine'),
	clean = require('gulp-clean'),
	ts = require('gulp-typescript'),
	tsLint = require('gulp-tslint');

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

var tsLintConfig = {
	configuration: {
		rules: {
			'class-name': true,
			/* 'curly': true,
			'eofline': true,
			'indent': [true, 'tabs'],
			'max-line-length': 120,
			'no-arg': true,
			'no-conditional-assignment': true,
			'no-console': [true,
        'log',
				'debug',
        'info',
        'time',
        'timeEnd',
        'trace'
			],
			'no-consecutive-blank-lines': true,
			'no-construct': true,
			'no-debugger': true,
			'no-duplicate-key': true,
			'no-duplicate-variable': true */
		}
	}
};

var tsSourceCompilerConfig = {
	noImplicitAny: true,
	declaration: true,
	sortOutput: true,
	out: JS_SRC_FILE,
	outFile: JS_SRC_FILE
};

var tsTestCompilerConfig = {
	removeComments: true,
	sortOutput: true,
	out: JS_TESTS_FILE,
	outFile: JS_TESTS_FILE
};

gulp.task('lint', function () {
	return gulp.src(SRC_FILES_EXPR)
		.pipe(tsLint(tsLintConfig))
		.pipe(tsLint.report('verbose', {
			emitError: true,
		}));
});

gulp.task('compile-src', function () {
	var result = gulp.src(SRC_FILES_EXPR)
		.pipe(ts(tsSourceCompilerConfig));
	return merge([
		result.js.pipe(replace(REFERENCE_REPLACE_REGEX, '')).pipe(gulp.dest(DIST_FOLDER)),
		result.dts.pipe(replace(REFERENCE_REPLACE_REGEX, '')).pipe(gulp.dest(DIST_FOLDER)),
	]);
});

gulp.task('test', ['lint'], function () {
	return gulp.src([SRC_FILES_EXPR, TEST_JASMINE, TEST_FILES_EXPR])
		.pipe(ts(tsTestCompilerConfig)).js
		.pipe(gulp.dest(DIST_FOLDER))
		.pipe(jasmine({ verbose: true, includeStackTrace: true }));
});

gulp.task('clean', function () {
	return gulp.src([DIST_FOLDER])
		.pipe(clean());
});

gulp.task('minify', ['compile-src'], function () {
	return gulp.src(DIST_FOLDER + '/' + JS_SRC_FILE)
		.pipe(concat(JS_MIN_SRC_FILE)) // to have the desired filename
		.pipe(uglifiy())
		.pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('default', ['minify']);

gulp.on('err', function (e) {
	console.log(e.err.stack)
});