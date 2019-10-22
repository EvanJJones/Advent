const fs = require('fs');

const array = fs
  .readFileSync('input.txt')
  .toString()
  .split('\r\n');

const reachedNumbers = [];
let total = 0;

function addInput() {
  for (let i = 0; i < array.length; i += 1) {
    total += parseInt(array[i], 10);
    if (reachedNumbers.includes(total)) {
      console.log(total);
      return;
    }
    reachedNumbers.push(total);
  }
  addInput();
}

addInput();
