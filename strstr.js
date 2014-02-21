/**
 * Returns the position of the first occurrence of a string in a string
 */

function strstr(haystack, needle) {
	var pos;

	for (pos = 0; pos <= haystack.length - needle.length; pos++) {
		for (var i = 0; i < needle.length; i++) {
			if (needle.charAt(i) !== haystack.charAt(pos + i)) {
				break;
			} else if (i === needle.length - 1) {
				// found a whole occurrence of needle return the pos
				return pos;
			}
		}
	}

	return -1;
}


function Hasher() {
	var PRIME = 7;
	var PRIME2 = 31;

	var getMultiplier = function(charCode) {
		return PRIME2 * charCode;
	}

	/**
	 * @param {String} str
	 * @return {Integer} hash
	 */
	this.hash = function(str) {
		var hash = PRIME;
		var len = str.length;
		for (var i = 0; i < len; i++) {
			// TODO fix this hash function to not hit integer ceiling
			hash = hash * getMultiplier(str.charCodeAt(i));
		}
		return hash;
	}

	this.unpack = function(hash, charCode) {
		return hash / getMultiplier(charCode);
	};

	this.pack = function(hash, charCode) {
		return hash * getMultiplier(charCode);
	};
}

function SubstringHash(hasher, str, offset, len) {
	var hash = hasher.hash(str.slice(offset, offset + len));

	this.shift = function() {
		//console.log(str.charAt(offset), str.charAt(offset+len));
		hash = hasher.pack(hasher.unpack(hash, str.charCodeAt(offset)), str.charCodeAt(offset + len));
		//console.log(str.slice(offset+1, offset+len+1));
		offset++;
		return hash;
	};

	this.getHash = function() {
		return hash;
	};

	this.canShift = function() {
		return (offset < str.length - len);
	};

	this.getOffset = function() {
		return offset;
	}
}

function isSubstrAt(haystack, needle, pos) {
	for (var i = 0; i < needle.length; i++) {
		//console.log(needle.charAt(i), haystack.charAt(pos + i));
		if (needle.charAt(i) !== haystack.charAt(pos + i)) {
			return false;
		}
	}

	return true;
}

function rabinKarp(haystack, needle) {
	var hasher = new Hasher();
	var substrHash = new SubstringHash(hasher, haystack, 0, needle.length);
	var needleHash = hasher.hash(needle);

	while (true) {
		//console.log('hey', substrHash.getOffset(), substrHash.getHash(), needleHash);
		if (substrHash.getHash() === needleHash && isSubstrAt(haystack, needle, substrHash.getOffset())) {
			return substrHash.getOffset();
		}

		if (!substrHash.canShift()) {
			break;
		}
		substrHash.shift();
	}
	return -1;
}

var ex = "jordan"; // 23
//console.log(rabinKarp(ex, 'Hello'));
//console.log(rabinKarp(ex, 'is'));
console.log(rabinKarp(ex, 'dan'));


//var a = "hello my name is jordan";
//console.log(strstr(a, 'jordan'));
