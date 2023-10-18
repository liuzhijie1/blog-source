const fs = require('fs')

function promisfy(fn) {
  return function (...args) {
    
  }
}


const readFile = promisfy(fs.writeFile);

readFile('note.md', 'utf8').then(data => {
  console.log(data);
})