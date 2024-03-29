let fs = require('fs')

function read(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

// 1. promise 成功和失败的回调的返回值 可以传递到外层的下一个then
// 2. 如果返回的是普通值的话 （传递到下一次的成功中）， 可能还要promise的情况，出错的情况（一定会走到下一次的失败）
// 3. promise的情况，，（会采用promise的状态， 决定走下一次的成功还是失败）
// 4. 错误处理， 如果里自己最近的then 没有错误处理 会向下找 
// read('./name.txt').then((data) => {
//   console.log(data)
//   throw new Error('123')
// }, (err) => {
//   console.log(err)
// }).then(data => {
//   console.log('--------', data)
// }, err => {
//   console.log('1----------1', err)
// })

// 4. 每次执行完promise.then方法后返回的都是一个 "新的promise" (promise一旦成功或者失败就不能修改状态)

read('./name.txt').then((data) => {
  return read(data)
}, (err) => {
  console.log(err)
}).then(data => {
  console.log('--------', data)
}, err => {
  console.log('1----------1', err)
})

// fs.readFile('./name.txt', 'utf8', (err, data) => {
//   fs.readFile(data, 'utf8', (err, data) => {
//     console.log(data)
//   })
// })