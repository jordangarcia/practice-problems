/**
 * 1 - 1
 * 2 - 11
 * 3 - 21
 */

function sayAloud(str) {
  var split = str.split('');
  var output = '';
  var last = split[0];
  var count = 1;

  split.slice(1).forEach(function(curr, ind) {
    if (curr === last) {
      count++;
    } else {
      output += String(count) + String(last);
      count = 1;
    }

    last = curr;
  });

  output += String(count) + String(last);

  return output;
}

function solve(n) {
  var i = 0;
  var prev = '1';

  while (i < n) {
    prev = sayAloud(prev);
    i++;
  }

  return prev;
}

console.log(solve(process.argv[2]));
