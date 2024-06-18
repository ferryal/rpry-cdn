const fs = require('fs');
const { minify } = require('terser');

const inputFilePath = 'widget.js';
const outputFilePath = 'widget.min.js';

// Read the input JavaScript file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the input file:', err);
    return;
  }

  // Minify the JavaScript code using Terser
  minify(data).then(minified => {
    if (minified.error) {
      console.error('Error during minification:', minified.error);
      return;
    }

    // Write the minified code to the output file
    fs.writeFile(outputFilePath, minified.code, err => {
      if (err) {
        console.error('Error writing the output file:', err);
        return;
      }

      console.log('File minified successfully. Output saved to', outputFilePath);
    });
  }).catch(err => {
    console.error('Error during minification:', err);
  });
});
