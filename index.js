import Mustache from 'mustache';
import fs from 'fs';
import os from 'os';
const MUSTACHE_MAIN_DIR = './main.mustache';
/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
  * Notice the "date" property.
*/
let DATA = {
  date: new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    timeZone: 'Europe/London',
  }),
};
/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, mustacheData) =>  {
    if (err) throw err;

    fs.readFile('README.md', 'utf-8', (err, readmeData) => {
      if (err) throw err;
      
      let lines = readmeData.split(os.EOL);
      if (lines.length >= 1) {
        lines[1] = Mustache.render(mustacheData.toString(), DATA);
        const output = lines.join(os.EOL);
        fs.writeFileSync('README.md', output);
      } else {
        console.log('README.md is empty');
      }
    });
  });
}

generateReadMe();