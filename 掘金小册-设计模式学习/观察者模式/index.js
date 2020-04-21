/* 
    观察者模式有一个“别名”，叫发布 - 订阅模式（之所以别名加了引号，
    是因为两者之间存在着细微的差异，

    观察者模式定义了一种一对多的依赖关系，
    让多个观察者对象同时监听某一个目标对象，
    当这个目标对象的状态发生变化时，
    会通知所有观察者对象，使它们能够自动更新。


    角色划分 --> 状态变化 --> 发布者通知到订阅者，这就是观察者模式的“套路”。

*/

/* 
    发布者三个基本功能：
            增加订阅者
            移除订阅者
            通知所有订阅者（发布）
*/
// 定义发布者类
class Publisher {
    constructor() {
      this.observers = []
      console.log('Publisher created')
    }
    // 增加订阅者
    add(observer) {
      console.log('Publisher.add invoked')
      this.observers.push(observer)
    }
    // 移除订阅者
    remove(observer) {
      console.log('Publisher.remove invoked')
      this.observers.forEach((item, i) => {
        if (item === observer) {
          this.observers.splice(i, 1)
        }
      })
    }
    // 通知所有订阅者
    notify() {
      console.log('Publisher.notify invoked')
      this.observers.forEach((observer) => {
        observer.update(this)
      })
    }
  }

//   订阅者

/* 
  行为有两个
    1：等待发布者通知
    2：执行发布者通知后需要执行的操作

    tips：个人理解只有一件事 
        等待状态更新 发布者调用订阅者的方法 订阅者执行对应的操作
*/
class Observer {
    constructor() {
        console.log('Observer created')
    }

    update() {
        console.log('Observer.update invoked')
    }
}

// 以上，完成了最基本的发布者和订阅者类的设计和编写
// 可以通过拓展发布者类，来使所有的订阅者来监听某个特定状态的变化
// 定义一个具体的需求文档（prd）发布类
class PrdPublisher extends Publisher {
    constructor() {
        super()
        // 初始化需求文档
        this.prdState = null
        // 韩梅梅还没有拉群，开发群目前为空
        this.observers = []
        console.log('PrdPublisher created')
    }
    
    // 该方法用于获取当前的prdState
    getState() {
        console.log('PrdPublisher.getState invoked')
        return this.prdState
    }
    
    // 该方法用于改变prdState的值
    setState(state) {
        console.log('PrdPublisher.setState invoked')
        // prd的值发生改变
        this.prdState = state
        // 需求文档变更，立刻通知所有开发者
        this.notify()
    }
}
// 作为订阅方，开发者的任务也变得具体起来：接收需求文档、并开始干活：
class DeveloperObserver extends Observer {
    constructor() {
        super()
        // 需求文档一开始还不存在，prd初始为空对象
        this.prdState = {}
        console.log('DeveloperObserver created')
    }
    
    // 重写一个具体的update方法
    update(publisher) {
        console.log('DeveloperObserver.update invoked')
        // 更新需求文档
        this.prdState = publisher.getState()
        // 调用工作函数
        this.work()
    }
    
    // work方法，一个专门搬砖的方法
    work() {
        // 获取需求文档
        const prd = this.prdState
        // 开始基于需求文档提供的信息搬砖。。。
        console.log('996 begins...')
    }
}

// 发布者
const hanMeiMei = new PrdPublisher()
// 订阅者
const liLei = new DeveloperObserver()
const A = new DeveloperObserver()
const B = new DeveloperObserver()
const prd = {
    // 具体的需求内容
    // 也可以是请求接口返回的数据
    // 也可以经过数据计算得到了结果 
    //  反正是经过一系列的操作状态变化了，可以通知订阅者执行具体操作了
}
// 将订阅者加入发布者的订阅数组中去，发布订阅模式一般是先订阅再发布
hanMeiMei.add(liLei)
hanMeiMei.add(A)
hanMeiMei.add(B)
// 发布
hanMeiMei.setState(prd)