const fs = require('fs');
const traverseDirectory = require('./traverse-directory');

/**
 * Replace all occurrences of a string in the directory, recursively
 * @param {string} dir Directory to replace in, recursively
 * @param {RegExp} regex Regex string to replace
 * @param {string} newstr New replacement text
 */
function replaceTextInDirectory(dir, regex, newstr) {
	return new Promise((accept, reject) => {
		traverseDirectory(dir, (file) => {
			// TODO: Use r/w stream instead?
			// Load file
			fs.readFile(file, (error, data) => {
				if (error) {
					return reject(error);
				}
				else {
					// Replace occurrences
					const output = data.toString().replace(regex, newstr);

					// Save file
					fs.writeFile(file, output, (writeError) => {
						if (writeError) {
							return reject(writeError);
						}
					});
				}
			});
		})
			.then(accept)
			.catch(reject);
	});
}
module.exports = replaceTextInDirectory;
