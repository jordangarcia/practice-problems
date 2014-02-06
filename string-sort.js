var assert = require('assert');

var input = 'lkdjfg';
var expected = 'dfgjkl';


function sortString(str) {
	var len = str.length;
	var sorted = str.split('');

	for (var i = 0; i < len; i++) {
		var jMin = i;

		for (var j = i + 1; j < len; j++) {
			if (sorted[j] < sorted[jMin]) {
				jMin = j;
			}
		}

		if (jMin !== i) {
			var tmp = sorted[i];
			sorted[i] = sorted[jMin];
			sorted[jMin] = tmp;
		}
		console.log(sorted);
	}
	return sorted.join('');
}

assert.equal(sortString(input), expected);
