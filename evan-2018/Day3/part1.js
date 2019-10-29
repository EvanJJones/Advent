const fs = require('fs');

const input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\r\n');

/* input is #id @ distance from left, distance from top: area XxY
 */

const grid = [];
let overlap = 0;

// adds a single point to the grid
function addPointToGrid(x, y) {
  if (!grid[x]) {
    grid[x] = [];
    grid[x][y] = 1;
  } else if (!grid[x][y]) {
    grid[x][y] = 1;
  } else if (grid[x][y] === 1) {
    grid[x][y] += 1;
    overlap += 1;
  }
}

// adds a rectangle to the grid
function addRectToGrid(x, y, width, height) {
  for (let i = 0; i < width; i += 1) {
    for (let j = 0; j < height; j += 1) {
      addPointToGrid(x + i, y + j);
    }
  }
}

function processInput(line) {
  const numbers = line.match(/\d+/g).map(Number);
  const [id, x, y, width, height] = numbers;
  addRectToGrid(x, y, width, height);
}
input.forEach(processInput);

console.log(overlap);
