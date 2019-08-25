const fs = require('fs');
const path = require('path');

const ignoreDirectories = require('./ignore-directories');
const strIncludesElement = require('../string/str-includes-element');

/**
 * Traverse a directory
 * https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
 * 
 * @param {string} dir Directory to start at
 * @param {Function} eachFile Callback to run for each file
 * @return {Promise}
 */
function traverseDirectory(dir, eachFile, ignoreDirs = ignoreDirectories) {
	return new Promise((accept, reject) => {
		fs.readdir(dir, function(error, list) {
			if (error) {
				return reject(error);
			}

			let pending = list.length;
			if (!pending) {
				return accept();
			}

			list.forEach((file) => {
				file = path.resolve(dir, file);

				fs.stat(file, function(error, stat) {
					if (stat && stat.isDirectory()) {
						traverseDirectory(file, eachFile)
							.then(() => {
								if (!--pending) {
									return accept();
								}
							})
							.catch(reject);
					}
					else {
						if (
							eachFile instanceof Function &&
							!strIncludesElement(file, ignoreDirs)
						) {
							eachFile(file);
						}

						if (!--pending) {
							return accept();
						}
					}
				});
			});
		});
	});
}

module.exports = traverseDirectory;
