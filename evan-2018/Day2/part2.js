const fs = require('fs');

const input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\r\n');

/* I need to find the two ids that are distinct by only one character
  Object that holds characters and positions?
  way to enumerate difference between inputs
  variable to hold difference, when that difference reaches 2 move on */

// function to compare two strings
// returns false if difference is greater than 1, otherwise returns position of difference
function compare(string1, string2) {
  let difference = 0;
  let diffPosition = 0;
  for (let i = 0; i < string1.length; i += 1) {
    if (string1[i] !== string2[i]) {
      difference += 1;
      if (difference > 1) {
        return false;
      }
      diffPosition = i;
    }
  }
  return diffPosition;
}
for (let i = 0; i < input.length; i += 1) {
  for (let j = i; j < input.length; j += 1) {
    const char = compare(input[i], input[j]);
    if (char) {
      const result = input[i].split('');
      result.splice(char, 1);
      console.log(result.join(''));
    }
  }
}
