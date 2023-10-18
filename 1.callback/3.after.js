 let fs = require('fs')

function after(times, callback) {
  return function () {
    if (--times === 0) {
      callback();
    }
  }
}

let cb = after(2, function() {
  console.log('ok')
})

 fs.readFile('./../name.txt', 'utf8', function (err, data) {
  console.log(data)
 })

//  闭包
/**
 * 定义的作用域和调用的作用域不是同一个作用域 作用域链  原型链  词法作用域链 和 动态绑定的作用域
 */