var _ = require('underscore');

// doit(1) => 1
// doit(4) => 1111 or 112 or 121 or 211

function getCombinations(num) {
  var rslt1 = _.range(0, num).map(function() {
    return 1;
  });

  var results = [rslt1];

  for (var i = 1; i <= rslt1.length / 2; i++) {
    var toRemove = i*2;

    // clone arr
    var newArr = rslt1.slice(0)
    // splice out
    newArr.splice(0, toRemove);
    for (var j = 1; j <= i; j++) {
      newArr.push(2);
    }

    results.push(newArr);
  }

  return results;
}

function permutations(input) {
  var permArr = [],
  usedChars = [];

  function permute(input) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      usedChars.push(ch);
      if (input.length == 0) {
        permArr.push(usedChars.slice());
      }
      permute(input);
      input.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr
  };

  return permute(input);
}


function main(input) {
  var results = [];
  getCombinations(input).forEach(function(rslt) {
    permutations(rslt).forEach(function(rslt) {
      results.push(rslt);
    });
  })
  return _.uniq(results, function(val) {
    return val.join('');
  });
}

console.log(main(process.argv[2]));
