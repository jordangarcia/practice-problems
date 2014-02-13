[1, 2, 3, 4, 5].forEach(function(val, ind) {
	setTimeout(function() {
		console.log(val, ind);
	}, 0);
});

for (var i = 0; i < 5; i++) {
	setTimeout(function() {
		console.log(i);
	}, 0);
}
