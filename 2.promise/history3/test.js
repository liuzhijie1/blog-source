const fs = require('fs')
const Promise = require('../promise')

function read(...args) {
  return new Promise((resolve, reject) => {
    resolve()
  })
}


let p1 = read('./name.txt')

let p2 = p1.then((data) => {
  throw new Error()
  return 100
}, () => {
  return 200;
})


let p3 = p2.then((data) => {
  console.log(data)
}, (error) => {
  console.log('error111', error)
})