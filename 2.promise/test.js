

// 如果then不传默认值的情况下，赋予默认值


// 延迟对象的调用，防止了2层嵌套， 减少了一次套用
// const Promise = require('./promise')
// const fs = require('fs')
// function read() {
//   let dfd = Promise.defer();

//   fs.readFile(...args, function(err, data) {
//     if (err) return dfd.reject(err);
//     dfd.resolve(data);
//   })

//   return dfd.promise;
// }


// read('./name.txt', 'utf8').then(data => {
//   console.log(data)
// })


// static 方法来实现下

let fs = require('fs').promises;

Promise.resolve(new Promise((resolve) => {
  resolve(11)
})).then(data => {
  console.log(data)
})


