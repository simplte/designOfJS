const fs = require('fs');
// 使用after方法解决异步方法并行执行之后的操作,
// 原理:其实是使用闭包和回调的方式  将不同异步执行的结果放到闭包函数内存中封存
// 闭包中封存的执行次数等于小于0时执行回调 并将闭包中封存的执行结果传入
function after(times, cb) {
    let cacheObj = {}
    return function(key, value) {
        cacheObj[key] = value
        times-- ;
        if(times <= 0) cb && cb(cacheObj)
    }
}
let getFile = after(2,(params) => {
    console.log(params)
})
fs.readFile('./fs/a.txt', 'utf8', function(err, data) {
    console.log(data);
    getFile('a',data)
});
fs.readFile('./fs/b.txt', 'utf8', function(err, data) {
    console.log(data);
    getFile('b',data)
});

return;
// 发布订阅订阅者模式实现上面异步方法并行执行完之后执行之后的操作
class Subscribe {
    constructor() {
        this.listerArr = []
    }
     on(listner) {
        this.listerArr.push(listner)
    }
     emit() {
        this.listerArr.forEach(x => x());
    }
}
let dataObj = [] 
let subFn = new Subscribe()
subFn.on(()=> {
    console.log('执行一次')
})
subFn.on(()=> {
    console.log('执行二次')
    if(dataObj.length >= 2) {
        console.log('变天了')
    }
})
fs.readFile('./fs/a.txt', 'utf8', function(err, data) {
    dataObj.push(data)
    subFn.emit()
});
fs.readFile('./fs/b.txt', 'utf8', function(err, data) {
    dataObj.push(data)
    subFn.emit()
});