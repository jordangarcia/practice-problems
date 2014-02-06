var words = ['bob', 'obb', 'ass', 'bbo', 'sas', 'team', 'meat'];
var buckets = {};
var sorted;
var results = [];

for (var i=0; i < words.length; i++) {
	sorted = words[i].split('').sort();
	if (!buckets[sorted]) {
		buckets[sorted] = [];
	}
	buckets[sorted].push(i);
}

console.log(buckets);

for (key in buckets) {
	buckets[key].forEach(function(ind) {
		results.push(words[ind]);
	});
}
console.log(results);
