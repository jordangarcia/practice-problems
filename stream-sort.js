var MinHeap = require ('./min-heap.js');

var streams = [
	[0, 1, 1, 2, 3, 4],
	[2, 3, 4, 8, 99, 100],
	[3, 3, 5, 9, 10000, 1000000]
];

function sortStreams(inputs, output) {
	// initialize the heap with the first value in all streams

	var streamHeap = new MinHeap(function(node) {
		return node.value;
	});

	// store the first value of each stream in the heap
	inputs.forEach(function(stream) {
		streamHeap.insert({
			value: stream.shift(),
			stream: stream
		});
	});

	while(streamHeap.contents.length > 0) {
		var node = streamHeap.pop();
		// push the value from the heap to output stream
		output.push(node.value);
		// add an entry to heap from the stream that was popped so the comparison is meaningful
		if (node.stream.length > 0) {
			streamHeap.insert({
				value: node.stream.shift(),
				stream: node.stream
			});
		}
	}
}

var output = [];

sortStreams(streams, output);
console.log(output);
