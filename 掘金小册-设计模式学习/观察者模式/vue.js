// observe方法遍历并包装对象属性
function observe(target) {
    if(target && typeof target == "object") {
        Object.keys(target).forEach(key => {
            defineReactive(target,key,target[key])
        })
    }
}
// 改写前的
// function defineReactive(target, key ,val) {
//     // 属性值如果是对象需要递归
//     observe(val);
//     Object.defineProperty(target,key, {
//         // 可枚举
//         enumerable:true,
//         // 不可配置
//         configurable:false,
//         get:function() {
//             return val;
//         },
//         set:function(val) {
//             console.log(`${target}属性的${key}变成了${val}`)
//         }
//     })
// }
// 改写后的
function defineReactive(target, key, val) {
    const dep = new Dep();
    dep.addSub({
        key,
        update:function() {
            console.log(`执行了update操作key值${this.key}`)
        }
    })
    // 属性值如果是对象需要递归
    observe(val);
        Object.defineProperty(target,key, {
        // 可枚举
        enumerable:true,
        // 不可配置
        configurable:false,
        get:function() {
            return val;
        },
        set:function(val) {
            dep.notify(key)
            console.log(`${target}属性的${key}变成了${val}`)
        }
    })
}
// 订阅者
class Dep {
    constructor(){
        // 初始化订阅队列
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify(key) {
        console.log(key)
        this.subs.forEach(sub =>  {
            if(sub.key == key) {
                sub.update()
            }
        })
    }
}
let _obj = {
    a:1,
    b:2
}

observe(_obj);
_obj.a = '2'
console.log(_obj)

// vue的双向事件绑定并不完善，找机会重新写一遍

// Event Bus/ Event Emitter  全局事件总线
// 属于发布-订阅模式

class EventEmitter {
    constructor() {
      // handlers是一个map，用于存储事件与回调之间的对应关系
      this.handlers = {}
    }
  
    // on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
    on(eventName, cb) {
      // 先检查一下目标事件名有没有对应的监听函数队列
      if (!this.handlers[eventName]) {
        // 如果没有，那么首先初始化一个监听函数队列
        this.handlers[eventName] = []
      }
  
      // 把回调函数推入目标事件的监听函数队列里去
      this.handlers[eventName].push(cb)
    }
  
    // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
    emit(eventName, ...args) {
      // 检查目标事件是否有监听函数队列
      if (this.handlers[eventName]) {
        // 如果有，则逐个调用队列里的回调函数
        this.handlers[eventName].forEach((callback) => {
          callback(...args)
        })
      }
    }
  
    // 移除某个事件回调队列里的指定回调函数
    off(eventName, cb) {
      const callbacks = this.handlers[eventName]
      const index = callbacks.indexOf(cb)
      if (index !== -1) {
        callbacks.splice(index, 1)
      }
    }
  
    // 为事件注册单次监听器
    once(eventName, cb) {
      // 对回调函数进行包装，使其执行完毕自动被移除
      const wrapper = (...args) => {
        cb.apply(...args)
        this.off(eventName, wrapper)
      }
      this.on(eventName, wrapper)
    }
  }
//   观察者模式与发布-订阅模式的区别
// 发布者不直接触及到订阅者、
// 而是由统一的第三方来完成实际的通信的操作，叫做发布-订阅模式，
//  发布者直接触及订阅者的操作是观察者模式