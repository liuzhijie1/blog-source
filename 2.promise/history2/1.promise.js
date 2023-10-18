//  es6-promise polyfill  
 
// 1. 多个异步请求并发 Promise.all
// 2. 链式异步请求的问题 上一个人的输出是下一个人的输入
// 3. 还是基于回调的 缺陷
// 4. 无法中断结果 

// 二

let Promise = require('./promise')
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 10)
})

promise.then(data => {
  console.log('success1', data)
  return '123'
}, (err) => {
  console.log(err)
}) 

// let promise1 = promise.then(data => {
//   console.log('success', data)
//   return '123'
// }, (err) => {
//   console.log(err)
// }) 

promise.then(data => {
  console.log('success2', data)
}, (err) => {
  console.log('err')
})