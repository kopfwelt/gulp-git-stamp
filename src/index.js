'use strict';

var through = require('through2');
var git = require('git-rev');

module.exports = function gitStamp(options) {

	function addGitTag(file, encoding, callback) {
		var options = options || {};

		if (file.isNull()) {
			return callback(null, file);
		}

		if (file.isStream()) {
			return callback(new Error(file, 'Streaming not supported'));
		}

		git.tag(function (tag) {
			var originalContents = String(file.contents);
			var newContents = new Buffer(originalContents + '<!-- tag:' + tag + ' -->');
			file.contents = newContents;
			callback(null, file);
		});
	}

	return through.obj(addGitTag);
};
