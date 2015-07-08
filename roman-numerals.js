var _ = require('underscore');

var DEF = {
  1: 'I',
  4: 'IV',
  5: 'V',
  9: 'IX',
  10: 'X',
  40: 'XL',
  50: 'L',
  90: 'XC',
  100: 'C',
  400: 'CD',
  500: 'D',
  900: 'CM',
  1000: 'M',
};


// 4 -> IV
// 44 XLIV

function findLargestNumeral(num) {
  var revKeys = _.keys(DEF).reverse().map(Number);
  var key = revKeys[0];
  var value;
  for (var i = 0; i < revKeys.length; i++) {
    if (revKeys[i] <= num) {
      return revKeys[i];
    }
  }
}

function doit(num) {
  var res = '';
  while (num != 0) {
    var sub = findLargestNumeral(num);
    res += DEF[sub];
    num = num - sub;
  }
  return res
}


console.log(doit(process.argv[2]));
