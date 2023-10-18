//  es6-promise polyfill  
 
// 1. 多个异步请求并发 Promise.all
// 2. 链式异步请求的问题 上一个人的输出是下一个人的输入
// 3. 还是基于回调的 缺陷
// 4. 无法中断结果 

let promise = new Promise((resolve, reject) => {
  throw new Error('s')
  resolve('ok')
})

promise.then(data => {
  console.log('success')
}, (err) => {
  console.log(err)
})