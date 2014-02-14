function BinarySearchTree(value) {
	this.root = new BSTNode(value);
}

/**
 * Binary Search Tree Node
 */
function BSTNode(value) {
	this.value = value;
	this.left = null;
	this.right = null;
}

BSTNode.prototype.insert = function(newNode) {
	if (newNode.value <= this.value) {
		if (this.left === null) {
			this.left = newNode;
		} else {
			this.left.insert(newNode);
		}
	} else {
		if (this.right === null) {
			this.right = newNode;
		} else {
			this.right.insert(newNode);
		}
	}
}

BSTNode.prototype.inOrderTraversal = function() {
	if(this.left !== null) {
		this.left.inOrderTraversal();
	}

	console.log(this.value);

	if(this.right !== null) {
		this.right.inOrderTraversal();
	}
};

BSTNode.prototype.preOrderTraversal = function() {
	console.log(this.value);

	if (this.left !== null) {
		this.left.preOrderTraversal();
	}

	if (this.right !== null) {
		this.right.preOrderTraversal();
	}
}

BinarySearchTree.prototype.insert = function(insertNode) {
	if (insertNode instanceof BSTNode) {
		this.root.insert(insertNode);
	} else {
		this.root.insert(new BSTNode(insertNode));
	}
};

BinarySearchTree.prototype.preOrderTraversal = function() {
	this.root.preOrderTraversal();
}

BinarySearchTree.prototype.inOrderTraversal = function() {
	this.root.inOrderTraversal();
}

var bst = new BinarySearchTree(10);
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(12);
bst.insert(15);

console.log(bst.root);

bst.inOrderTraversal();
