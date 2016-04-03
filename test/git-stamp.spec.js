/* global before,after,it,describe */
'use strict';

var gulp = require('gulp');

var chai = require('chai');
var chaiFs = require('chai-fs');
var expect = chai.expect;
chai.use(chaiFs);
var del = require('del');
var gitStamp = require('../src/');

describe('git stamp', function () {
	var fileIn;
	var fileOut;
	var expected;

	before(function () {
		fileIn = 'test/fixtures/index.html';
		fileOut = '.tmp/index.html';
		expected = '<html>test</html><!-- tag:0.0.2 -->';
	});

	after(function (done) {
		del(['.tmp'])
			.then(function () {
				done();
			});
	});

	it('should add the git tag into the html', function (done) {
		gulp.src(fileIn)
			.pipe(gitStamp())
			.pipe(gulp.dest('.tmp'))
			.on('end', function () {
				expect(fileOut).to.have.content(expected);
				done();
			});
	});
});
