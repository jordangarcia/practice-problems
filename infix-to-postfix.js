var Stack = require('./data-structures/stack.js');

var RE_OPERATOR = /\+|\-|\*|\/|\^/;

var prec = {
	'+': 1,
	'-': 1,
	'*': 2,
	'/': 2,
	'^': 3
};

function convert(expr) {
	var tokens = expr.split(' ');
	var stack = new Stack();
	var postfix = [];

	tokens.forEach(function(val) {
		if (RE_OPERATOR.test(val)) {
			while(
				!stack.isEmpty() &&
				prec[val] <= prec[stack.peek()] &&
				val !== '('
			) {
				postfix.push(stack.pop());
			}
			stack.push(val);
		} else if (val === '(') {
			stack.push(val);
		} else if (val === ')') {
			while(stack.peek() !== '(') {
				postfix.push(stack.pop());
			}
			// pop off the '('
			stack.pop();
		} else {
			postfix.push(val);
		}
		console.log(stack.contents, postfix);
	});

	while(!stack.isEmpty()) {
		postfix.push(stack.pop());
	}

	return postfix.join(' ');
}

module.exports = convert;
