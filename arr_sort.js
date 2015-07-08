var _ = require('underscore');
var diff = require('id-diff');

module.exports = function execute(arr, newArr) {
  var instructions = diff(arr, newArr)['ids'];

  var pointer = 0;

  var cache = (function createCache() {
    var pointer = 0;
    var cache = {};

    instructions.forEach(function(step) {
      var action = step[0];
      if (action === 'x') {
        cache[arr[pointer].id] = arr[pointer];
      }
      if (action === '=') {
        pointer++;
      }
    });

    return cache;
  })();

  instructions.forEach(function(step) {
    var action = step[0];
    var id = step[1];

    switch (action) {
      case 'x':
      case '-':
        // take out spliced item
        arr.splice(pointer, 1)
        break;

      case '+':
        cache[id] = {};
      case 'p':
        arr.splice(pointer, 0, cache[id]);
      case '=':
        _.extend(arr[pointer], _.findWhere(newArr, { id: id }))
        pointer++;
        break;

    }
  });
}
