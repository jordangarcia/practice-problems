/**
 * Testing function
 *
 * @param {MinHeap}
 */
function assertHeap(heap) {
	heap.contents.reduceRight(function(prev, curr, ind, arr) {
		if (ind > 0) {
			console.assert(arr[ind] > arr[parent(ind)]);
		}
	});
}

function parent(pos) {
	return Math.max(Math.ceil(pos / 2) - 1, 0);
}

var MinHeap = function(scoreFn) {
	this.contents = [];
	this.swap = function(a, b) {
		var temp = this.contents[a];
		this.contents[a] = this.contents[b];
		this.contents[b] = temp;
	}

	this.scoreFn = scoreFn;
}


MinHeap.prototype.isEmpty = function() {
	return this.contents.length === 0;
};

MinHeap.prototype.sinkDown = function(pos) {
	var i = pos;
	var score = this.scoreFn(this.contents[i]);
	var len = this.contents.length;
	var c1;
	var c2;
	var c1Score;
	var c2Score;

	while (true) {
		var swap = null;
		var c1 = (i*2) + 1;
		var c2 = (i*2) + 2;

		if (c1 < len) {
			c1Score = this.scoreFn(this.contents[c1]);
			if (c1Score < score) {
				swap = c1;
			}
		}

		if (c2 < len) {
			c2Score = this.scoreFn(this.contents[c2]);

			if (c2Score < (swap === null ? score : c1Score)) {
				swap = c2;
			}
		}

		if (swap === null) break;

		this.swap(i, swap);
		i = swap;
	}
};

MinHeap.prototype.bubbleUp = function(pos) {
	if (pos === 0) {
		return;
	}

	var i = pos;
	var p = parent(i);
	var temp;
	while (this.scoreFn(this.contents[i]) < this.scoreFn(this.contents[p])) {
		this.swap(i, p);
		i = p;
		p = parent(i);
		if (p === i) {
			break;
		}
	}
};

MinHeap.prototype.insert = function(val) {
	this.contents.push(val);
	// bubble up from the insertion point
	this.bubbleUp(this.contents.length - 1);
};

MinHeap.prototype.pop = function() {
	// save the root element
	var val = this.contents.shift();

	if (this.contents.length > 0) {
		// move the last element to the root
		this.contents.unshift(this.contents.pop());
		this.sinkDown(0);
	}

	return val;
};

module.exports = MinHeap;
