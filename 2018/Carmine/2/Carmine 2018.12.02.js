'use strict';

const fsPromises = require('fs').promises;

/**
 * Detects N of the same character in a string.
 * @param {integer} num The number of characters to look for.
 * @returns {function(string)} A function that take a string and looks for N of the same character.
 */
function checkN(num) {
  return (text) => {
    const frequencies = {};

    for (let i = 0; i < text.length; i += 1) {
      const char = text.charAt(i);

      if (frequencies[char] == null) {
        frequencies[char] = 0;
      }
      frequencies[char] += 1;
    }

    return (Object.values(frequencies).indexOf(num) !== -1);
  };
}

/**
 * Returns the common portion of two strings.
 * @param {string} first The first string.
 * @param {string} second The second string.
 * @returns {string} The portion of the string that is shared in common between both.
 */
function common(first, second) {
  let result = '';
  let index = 0;

  while (index < first.length && index < second.length) {
    if (first[index] === second[index]) {
      result += first[index];
    }
    index += 1;
  }

  return result;
}

(async () => {
  try {
    const buffer = await fsPromises.readFile('./data.txt');
    const data = buffer.toString().split(/\r?\n/);

    // Part one, detect 2-character strings and 3-character strings.

    const check2 = checkN(2);
    const check3 = checkN(3);
    let count2 = 0;
    let count3 = 0;

    data.forEach((entry) => {
      if (check2(entry)) {
        count2 += 1;
      }
      if (check3(entry)) {
        count3 += 1;
      }
    });

    const checksum = count2 * count3;

    console.log(`The checksum is ${checksum}.`);

    let i1 = 0;
    let result = null;

    while (i1 < data.length && result == null) {
      // We compare to all the subsequent entries.
      let i2 = i1 + 1;

      while (i2 < data.length && result == null) {
        if (data[i1].length === data[i2].length) {
          const overlap = common(data[i1], data[i2]);

          if (overlap.length === data[i1].length - 1) {
            result = overlap;
          }
        }
        i2 += 1;
      }
      i1 += 1;
    }

    console.log(`The matched common portion is ${result}.`);
  } catch (err) {
    // Catch all errors.
    console.error(`We hit an error: ${err}`);
  }
})();
