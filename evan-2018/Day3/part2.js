const fs = require('fs');

const input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\r\n');

/* input is #id @ distance from left, distance from top: area XxY
 */

const grid = [];
let overlap = 0;
let created = false;

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
  } else {
    grid[x][y] += 1;
  }
}

function checkPointOnGrid(x, y) {
  if (grid[x][y] > 1) {
    return 1;
  }
  return 0;
}

// adds a rectangle to the grid
function addRectToGrid(id, x, y, width, height) {
  let currentOverlap = 0;
  for (let i = 0; i < width; i += 1) {
    for (let j = 0; j < height; j += 1) {
      if (created) {
        currentOverlap += checkPointOnGrid(x + i, y + j);
      } else {
        addPointToGrid(x + i, y + j);
      }
    }
  }
  if (created && currentOverlap === 0) {
    console.log(id);
  }
}

function processInput(line) {
  const numbers = line.match(/\d+/g).map(Number);
  const [id, x, y, width, height] = numbers;
  addRectToGrid(id, x, y, width, height);
}

input.forEach(processInput);
created = true;
input.forEach(processInput);
