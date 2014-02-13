/**
 * Implementation of a linked list in Javascript
 */


/**
 * Singly Linked List definition
 *
 * Maintains reference to the first node in list and add/remove/find functions
 */
function List() {
	this.firstNode = null;
}

/**
 * Singly Linked List Node definition
 *
 * Holds any value and reference to the next node or NULL if the last node
 */
function Node(value) {
	this.value = value;
	this.next = null;
}

/**
 * Returns last node in linked list
 * @return {Node}
 */
List.prototype.getLastNode = function() {
	var node = this.firstNode;
	while(node.next !== null) {
		node = node.next;
	}
	return node;
};

/**
 * Pushes a new node to end of list with value = val
 */
List.prototype.push = function(val) {
	var node = new Node(val);

	if (this.firstNode === null) {
		this.firstNode = node;
	} else {
		this.getLastNode().next = node;
	}
};

/**
 * Inserts a new node with value = val after existingNode
 *
 * @param {Node} node
 * @param {Anything} val
 */
List.prototype.insertAfter = function(existingNode, val) {
	var node = new Node(val);
	node.next = existingNode.next;
	existingNode.next = node;
};

/**
 * Inserts a new node with value = val after existingNode
 *
 * @param {Node} node
 * @param {Anything} val
 */
List.prototype.insertBeginning = function(val) {
	var node = new Node(val);
	node.next = this.firstNode;
	this.firstNode = node;
};

/**
 * Removes the node after the inputted node
 *
 * @param {Node} node
 */
List.prototype.removeAfter = function(node) {
	if (node.next === null) {
		return;
	}
	var nodeToRemove = node.next;
	node.next = nodeToRemove.next;

	delete obsoleteNode;
};

/**
 * Removes the node after the inputted node
 *
 * @param {Node} node
 */
List.prototype.removeBeginning = function(node) {
	if (this.firstNode === null) return;

	var nodeToRemove = this.firstNode;
	this.firstNode = nodeToRemove.next;

	delete nodeToRemove;
};

List.prototype.toString = function() {
	var str = '';
	var node = this.firstNode;

	str += node.value;

	while(node.next !== null) {
		str += ' -> ';
		node = node.next;
		str += node.value;
	}

	return str;
};

/**
 * Finds the first node with value === valueToFind
 *
 * @return {Node}
 */
List.prototype.findFirst = function(valueToFind) {
	var node = this.firstNode;

	while(node.value !== valueToFind && node.next !== null) {
		node = node.next;
	}

	return node;
};

module.exports = List;
