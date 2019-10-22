const fs = require('fs');

const input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\r\n');

let twos = 0;
let threes = 0;

/* start with array with each line a seperate element
in each element
-- find if a character appears twice
-- find if a character appears three times
-- add one for each of those that is true

ideas
--create array that i add each letter to and check if it apears twice and three times
--create object that will have a key for each letter and a value of how many times it appears
  --
 */

const processor = (data) => {
  const letterCounts = {};

  for (let i = 0; i < data.length; i += 1) {
    const newChar = data[i].toLowerCase();

    if (!letterCounts[newChar]) {
      letterCounts[newChar] = 0;
    }
    letterCounts[newChar] += 1;
  }
  if (Object.values(letterCounts).includes(2)) {
    twos += 1;
  }
  if (Object.values(letterCounts).includes(3)) {
    threes += 1;
  }
};

input.forEach(processor);

console.log(twos * threes);
