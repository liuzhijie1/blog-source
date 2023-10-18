// Promise 状态：Promise 可以处于三种状态之一：pending（进行中）、fulfilled（已完成）和rejected（已拒绝）。状态只能从 pending 转变为 fulfilled 或 rejected，一旦转变，就不能再改变。

// then 方法：Promise 对象必须提供一个 then 方法，用于处理 Promise 的状态变化。then 方法接收两个参数：onFulfilled（当 Promise 状态为 fulfilled 时的回调函数）和 onRejected（当 Promise 状态为 rejected 时的回调函数）。

// 异步执行：then 方法的回调函数必须异步执行，即放入任务队列中，以确保回调函数在 Promise 状态变化后执行。

// 值传递和链式调用：then 方法必须返回一个新的 Promise 对象，以支持链式调用。then 方法的回调函数可以返回一个值或一个新的 Promise 对象，用于将值传递给下一个 Promise。

// 错误处理：如果在 then 方法的回调函数中发生异常（抛出错误），或者回调函数返回一个拒绝的 Promise，则会将该异常或拒绝的原因作为参数，传递给下一个 then 方法中的 onRejected 回调函数。

// Promise 解析过程：规范中定义了 Promise 解析过程，用于处理 then 方法的参数，并根据参数的类型和状态进行相应的处理。

// 1. Promise 是一个类
// 2. promise 有三种状态
// 3. 用户决定是否成功
// 4. promise默认执行器立即执行
// 5.promise 有一个then方法，接受一个成功的回调和失败的回调
// 6. 如果执行异常，也会执行失败的逻辑
// 7. promise状态只能切换一次

const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'

console.log('My')
class Promise {
  constructor(executer) {
    this.status = PENDING
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {

      if (val instanceof Promise) {
        return val.then(resolve, reject)
      }

      if (this.status === PENDING) {
        this.value = value
        this.status = RESOLVED
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executer(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err; }

    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(x, promise2, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2;
  }

  static resolve(val) {
    return new Promise((resolve, reject) => {
      resolve(val);
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  catch(err) {
    return this.then(null, err)
  }

}



// 我们的promise 按照规范来写， 就可以和别人的公用
function resolvePromise(x, promise2, resolve, reject) {
  console.log('revolvePromise')

  // 防止主机等待自己完成
  if (promise2 == x) {
    return reject(new TypeError('出错了'))
  }

  // 看 x 是普通值还是promise , 如果是promise要采用他的状态
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {

    let called;
    try {
      let then = x.then;

      if (typeof then === 'function') {
        //  then 是函数  我就认为这个x 是一个promise
        // 如果 x 是 promise 那么就采用他的状态
        then.call(x, function (y) {   // 调用返回的promise 用他的结果，作为下一次then的结果
          if (called) return;
          called = true;
          // 递归解析成功后的值 直到他是普通值为止
          resolvePromise(y, promise2, resolve, reject)
        }, function (r) {
          if (called) return;
          called = true;
          reject(r)
        })

      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e)
    }

  } else {
    resolve(x)
  }


  // 如果不是promise 直接就调用reslve
}

// 测试时会调用此方法
Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject
  })

  return dfd;

}

module.exports = Promise;