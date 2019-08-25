/**
 * Check if a string includes any element of an array
 * @param {string} str String to check
 * @param {Array} arr Array of elements to check against
 * @return {boolean}
 */
function strIncludesElement(str, arr) {
	for (let i = 0; i < arr.length; i++) {
		if (str.includes(arr[i])) {
			return true;
		}
	}

	return false;
}

module.exports = strIncludesElement;
