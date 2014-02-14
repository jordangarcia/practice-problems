/**
 * Implementation of Stack data structure
 */

function Stack() {
	this.contents = [];
}

Stack.prototype.push = function(val) {
	this.contents.push(val);
};

Stack.prototype.pop = function() {
	return this.contents.pop();
};

Stack.prototype.peek = function() {
	return this.contents[this.contents.length - 1];
};

Stack.prototype.isEmpty = function() {
	return this.contents.length === 0;
};

module.exports = Stack;
