const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
  input: fs.createReadStream('./input.txt'),
  output: false,
  console: false,
});

let count = 0;

readInterface.on('line', (line) => {
  count += parseInt(line, 10);
});

readInterface.on('close', () => {
  console.log(count);
});
