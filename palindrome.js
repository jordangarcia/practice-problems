/**
 * Note: if many palindromes exist in a word of the same length
 * the function will return the first
 *
 * 'aabbcc' will return 'aa'
 */
function palindrome(word) {
  var longest = ''
  for (var i = 0; i < word.length; i = i + .5) {
    var longestInPivot = pivotPalindrome(word, i)
    if (longestInPivot.length > longest.length) {
      longest = longestInPivot
    }
  }
  return longest
}

/**
 * Given an index goes outwards left and right until it finds the first
 * non palindrome and returns the longest one found.
 * ind:  0   1   2
 * word: a   b   a
 *             |
 *          Can start at 1.5 and compare 'ba'
 *
 * If starting at a pivot satisfying (pivot % 1 === 0) it will test a
 * paldinrome with a middle character, ex aba
 */
function pivotPalindrome(word, pivot) {
  var ind = Math.floor(pivot)
  var longest = word.charAt(ind)
  var start = ind - 1
  var end = (pivot % 1) ? ind + 2 : ind + 1

  while (start >= 0 && end <= word.length) {
    if (word.charAt(start) !== word.charAt(end-1)) {
      return longest
    }

    longest = word.slice(start, end)
    start--
    end++
  }
  return longest
}

console.log(palindrome('racecar'))
console.log(palindrome('abacabde'))
console.log(palindrome('aabbccddee'))
