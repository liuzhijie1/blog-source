// 观察者模式
/**
 * 有观察者
 * 肯定有被观察者
 * 观察者需要放到被观察者中，
 * 被观察者的状态发生变化需要通知观察者，我变化了
 * 
 * 内部也是基于发布订阅模式  被观察者，收集需要通知的观察者的信息
 */

class Subject {   // 被观察者
  constructor(name) {
    this.name = name;
    this.state = '开心的'
    this.observers = []
  };

  attach(o) {
    this.observers.push(o)
  }
  setState(newState) {
    this.state = newState;
    this.observers.forEach(o => o.updata(this))
  }
}


class Observer {  // 观察者
  constructor(name) {
    this.name = name;
  }
  updata(subject) {
    console.log('当前' + this.name + '被通知了， 当前小宝宝的状态是' + subject.state)
  }
}

let baby = new Subject('小宝宝')
let parent = new Observer('爸爸')
let mother = new Observer('妈妈')

baby.attach(parent)
baby.attach(mother)
baby.setState('被欺负了')