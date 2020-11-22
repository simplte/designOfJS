const fs = require('fs');
// fs.readFile('./fs/a.txt', 'utf8', function(err, data) {
// 	console.log(data);
// });
// fs.readFile('./fs/b.txt', 'utf8', function(err, data) {
// 	console.log(data);
// });
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