'use strict';

const fsPromises = require('fs').promises;

(async () => {
  try {
    const buffer = await fsPromises.readFile('./data.txt');
    const data = buffer.toString().split(/\r?\n/).map((e) => parseInt(e, 10));
    const sum = data.reduce((s, e) => s + e, 0);

    console.log(`The final frequency is ${sum}.`);

    const frequencies = {};
    let frequency = 0;

    frequencies[0] = 1;
    let i = 0;
    let done = false;

    while (!done) {
      if (i === data.length) {
        i = 0;
      } else {
        frequency += data[i];
        if (frequencies[frequency] == null) {
          frequencies[frequency] = 1;
        } else {
          frequencies[frequency] += 1;
          console.log(`We hit a duplicate at ${frequency}.`);
          done = true;
        }

        i += 1;
      }
    }
  } catch (err) {
    // Catch all errors.
    console.error(`We hit an error: ${err}`);
  }
})();
