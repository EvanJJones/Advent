'use strict';

const fsPromises = require('fs').promises;
const XRegExp = require('xregexp');

/**
 * Generate all permutations of indices.
 * @param {integer} xCorner The x value of the starting corner.
 * @param {integer} yCorner The y value of the starting corner.
 * @param {integer} xWidth The x width.
 * @param {integer} yWidth The y width.
 * @returns {array<string>} An array of indices, with 'x' in between.
 */
function generateIndices(xCorner, yCorner, xWidth, yWidth) {
  const result = [];

  for (let x = xCorner; x < xCorner + xWidth; x += 1) {
    for (let y = yCorner; y < yCorner + yWidth; y += 1) {
      result.push(`${x}x${y}`);
    }
  }

  return result;
}

(async () => {
  try {
    const buffer = await fsPromises.readFile('./data.txt');
    const data = buffer.toString().split(/\r?\n/);


    // Create a mapping of all fabric squares.
    const mapping = {};

    const pattern = XRegExp('#(?<squareNum>\\d*) @ (?<x>\\d*),(?<y>\\d*): (?<xWidth>\\d*)x(?<yWidth>\\d*)');

    data.forEach((entry) => {
      const parsed = XRegExp.exec(entry, pattern).map((e) => parseInt(e, 10));
      const [, squareNum, x, y, xWidth, yWidth] = parsed;

      const indices = generateIndices(x, y, xWidth, yWidth);

      indices.forEach((index) => {
        if (mapping[index] == null) {
          mapping[index] = [];
        }

        mapping[index].push(squareNum);
      });
    });
    // Find the repeated values...
    const repeats = Object.values(mapping).reduce((sum, entry) => ((entry.length > 1) ? sum + 1 :
      sum), 0);

    console.log(`Number of overlapped square inches: ${repeats}.`);

    // Find the non-repeated sets.
    const noRepeat = {};

    Object.entries(mapping).forEach(([, overlap]) => {
      // If there is a single entry and no earlier result in noRepeat, we mark as possible.
      if (overlap.length === 1 && noRepeat[overlap[0]] == null) {
        noRepeat[overlap[0]] = true;
      }
      if (overlap.length > 1) {
        overlap.forEach((entry) => {
          noRepeat[entry] = false;
        });
      }
    });

    const result = Object.entries(noRepeat).filter(([, unique]) => unique)
      .map(([squareNum]) => squareNum);

    console.log(`Unique patches: ${JSON.stringify(result, null, 2)}`);
  } catch (err) {
    // Catch all errors.
    console.error(`We hit an error: ${err}`);
  }
})();
