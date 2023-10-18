// 发布订阅模式  

let fs = require('fs')

let event = {
  arr: [],
  on(fn) {
    this.arr.push(fn)
  },
  emit() {
    this.arr.forEach(fn => fn())
  }
}


event.on(function() {

})

event.on(function() {

})

let school = {};

fs.readFile('./../name.txt', 'utf8', function(err, data) {
  school.name = data
  event.emit()
})

fs.readFile('./../age.txt', 'utf8', function(err, data) {
  school.age = data
  event.emit()
})