var RE_OPERATOR = /\+|\-|\*|\/|\^/;

/**
 * Evaluates a A + B type expression
 *
 * @param {Float} left
 * @param {Float} right
 * @param {String} operator
 */
function evaluate(left, right, operator) {
	switch(operator) {
		case '+':
		case '-':
		case '*':
		case '/':
			return eval(left+operator+right);
		case '^':
			return eval('Math.pow(' + left + ', ' + right + ')');
		default:
			throw "Invalid Operator " + operator;
	}
}

function calc(expr) {
	var tokens = expr.split(' ');
	var stack = [];
	// left and right
	var l;
	var r;

	tokens.forEach(function(val) {
		if (RE_OPERATOR.test(val)) {
			console.log(stack, val);
			r = stack.pop();
			l = stack.pop();

			stack.push(evaluate(l, r, val));
		} else {
			stack.push(parseFloat(val));
		}
	});

	if (stack.length > 1) {
		throw "Too many numbers";
	}

	return stack[0];
}

return calc;
