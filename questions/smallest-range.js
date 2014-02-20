var _ = require('underscore');
/**
You have k lists of sorted integers. Find the smallest range that includes at least one number from each of the k lists.

For example,
List 1: [4, 10, 15, 24, 26]
List 2: [0, 9, 12, 20]
List 3: [5, 18, 22, 30]

The smallest range here would be [20, 24] as it contains 24 from list 1, 20 from list 2, and 22 from list 3.
**/

var a = [4, 10, 15, 19,	20];
var b = [0, 9, 12, 20];
var c = [5, 20, 22, 30];

// [4,0,5] => 5
// [4,9,5] => 5
// [10,9,5] => 5
// [10,9,18] => 9

function clone(obj) {
	if (null == obj || "object" != typeof obj) return obj;
	var copy = obj.constructor();
	for (var attr in obj) {
		if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	}
	return copy;
}

// find the lowest and highest integer in an unsorted list
function getRange(arr) {
	var l = arr[0];
	var h = arr[1];
	var temp;
	if (l > h) {
		temp = l;
		l = h;
		h = temp;
	}

	for (var i = 2; i < arr.length; i++) {
		if (arr[i] > h) {
			h = arr[i];
		} else if (arr[i] < l) {
			l = arr[i];
		}
	}

	return [l, h];
}

function rangeValue(range) {
	return range[1] - range[0];
}

// given N arrays find the min length
function minLength(arrs) {
	var min;
	arrs.forEach(function(arr) {
		if (min === undefined) {
			min = arr.length;
		} else if (arr.length < min) {
			min = arr.length
		}
	});

	return min;
}


function solve(input) {
	var ind = 0;
	var len = minLength(input)

	// gets values from array of arrays
	// [1, 1, 2]
	function getValues(pointer) {
		return pointer.map(function(ind, arrInd) {
			return input[arrInd][ind];
		})
	}

	// gets the index of the array with the lowest value at the pointer
	function getLowestInd(pointer) {
		var lowestVal;
		var lowestInd;

		getValues(pointer).forEach(function(val, ind) {

			if (lowestVal === undefined) {
				lowestVal = val;
				lowestInd = ind;
			} else if (val < lowestVal){
				lowestVal = val;
				lowestInd = ind;
			}
		});
		return lowestInd;
	}

	function incrementLowest(pointer) {
		var newPointer = clone(pointer);
		var lowestInd = getLowestInd(newPointer);
		newPointer[lowestInd]++;
		if (newPointer[lowestInd] < input[lowestInd].length) {
			// prevent null pointer
			return newPointer;
		}
	}

	var best;

	for (var i = 0; i < len; i++) {
		var thisBest;
		// points to the current value of each array
		var pointer = input.map(function(arr) {
			return i;
		});

		while(true) {
			var curr = getRange(getValues(pointer));
			var currVal = rangeValue(curr);
			var nextPointer = incrementLowest(pointer);

			console.log({
				range: curr,
				value: currVal,
				pointer: pointer
			});

			if (
				!nextPointer ||
				currVal < rangeValue(getRange(getValues(nextPointer)))
			) {
				// this is the best for the starting index
				if (best === undefined || currVal < best.value) {
					best = {
						pointer: pointer,
						range: curr,
						value: currVal
					};
				}
				break;
			} else {
				pointer = nextPointer;
			}
		}
	}

	return best;
}

var input = [a,b,c];

var result = solve(input);
console.log(result);
