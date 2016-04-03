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
		expected = '<html>test</html><!-- tag:16a043c726f11524438cd2b2a66902a644c6f330 -->';
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
