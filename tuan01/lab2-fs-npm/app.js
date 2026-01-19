// const fs = require('fs');


// fs.readFile('input.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }
//     console.log('File content:');
//     console.log(data);
// });

// fs.writeFile('output.txt', 'File written using Node.js fs module!', (err) => {
//     if (err) {
//         console.error('Error writing file:', err);
//         return;
//     }
//     console.log('File written successfully!');
// });

// fs.appendFile('output.txt', '\nAppending new content...', (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('Data appended!');
// });


const _ = require('lodash');

const numbers = [1, 2, 3, 4, 5];
const shuffled = _.shuffle(numbers);

console.log('Original:', numbers);
console.log('Shuffled:', shuffled);