var SinglyLinkedList = require('./singly-linked-list.js');

/**
 * Asserts a linked list has elements in the order of values
 *
 * @param {linkedList}
 */
function assertOrder(linkedList, values) {
	var ind = 0;
	var node = linkedList.firstNode;

	while(node !== null) {
		if (values.length === 0) {
			throw new Error("Expecting end of LinkedList got " + node.value);
		}

		var value = values.shift();
		//console.log(values.length, value);
		console.assert(node.value === value, "Expect " + node.value + " to equal " + value);
		node = node.next;
	}

	if (values.length > 0) {
		throw "End of linked list, expecting " + values;
	}
}

var linkedList = new SinglyLinkedList();

linkedList.push(1);
linkedList.push(2);
linkedList.push(3);
linkedList.push(4);
linkedList.push(5);
linkedList.push(6);
linkedList.push(7);

var nodeValue3 = linkedList.findFirst(3);
linkedList.insertAfter(nodeValue3, 3.5);
linkedList.removeBeginning();
linkedList.insertBeginning(null);

var nodeValue5 = linkedList.findFirst(5);
linkedList.removeAfter(nodeValue5);

var expected = [null, 2, 3, 3.5, 4, 5, 7];

console.log(linkedList.toString());
assertOrder(linkedList, expected)
