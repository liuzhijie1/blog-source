// 函数柯里化  和  函数反柯里化


// 函数变量的类型
// typeof
// constructor
// instance of
// Object.prototype.toString.call()
function isType(type, value) {
  console.log(type,value)
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}
const currying = (fn, arr = []) => {
  let len = fn.length;
  return function (...args) {
    // console.log(args)
    let concatValue = [...arr, ...args];  // 使用arr 多次调用，会携带之前的值
    if (concatValue.length < len) {
      return currying(fn, concatValue);
    } else {
      return fn(...concatValue)
    }
  }
}

let isArray = currying(isType)('Array')
let isString = currying(isType)('String')
console.log(isArray([]))
console.log(isArray('string'))
console.log(isString([]))
console.log(isString('123'))