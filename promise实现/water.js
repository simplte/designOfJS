// 观察者模式和发布订阅模式的区别是什么
// 1：观察者模式是 观察者和被观察者直接联系没有中间变量直接有关系，基于发布订阅模式
// 2：发布订阅模式有中间变量中间变量满足条件时 执行订阅的方法

// 被观察者
// 做三件事情
/**
 * 1:增加观察者（注册）
 * 2：删除观察者
 * 3：触发观察者中的方法
 */
// 珠峰例子:  被观察者好比孩子
class subject{
    constructor(state) {
        this.state = state;
        this.observerArr = []
    }
    addObserve(key, ob) {
        this.observerArr.push({
            key,
            ob
        })
    }
    removeObserve(obkey) {
        this.observerArr.splice(this.observerArr.findIndex(x => x.key == obkey),1);
    }
    // 孩子状态变化了通知观察者
    notify(newState) {
        this.state = newState;
        this.observerArr.forEach(obItem => {
            obItem.ob.updata(this.state)
        })
    }
}
// 观察者（父母） 当孩子状态变化了 需要知道并作出对应的处理
class Observer{
    constructor(name,cb) {
        this.name = name;
        this.obserDo = cb
    }
    updata(state) {
        this.obserDo(`孩子现在${state}`)
    }
}

let child = new subject('开心')
let baba = new Observer('爸爸',(str)=> {
    console.log(str,'，再哭就揍')
})
let mama = new Observer('妈妈',(str)=> {
    console.log(str,'，我要哄哄她')
})
child.addObserve('baba',baba)
child.addObserve('mama',mama)
child.notify('生气')