// 1·AOP 面向切片编程（函数劫持），重写一些方法
function say(who) {
    console.log(`${who}说话`)
}
Function.prototype.sayBefore = function(cb) {
    // 返回一个箭头函数 箭头函数没有this  没有arguments 没有原型
    return (...args) => {
        // 说话前执行的动作，比如说咳嗽
        cb && cb()
        // 执行之后的动作,传入的参数，this指向当前执行的方法
        this(...args)
    }
}
// newFn接收sayBefore 返回的方法
let newFn = say.sayBefore(() => {
    console.log('说话之前我先清清嗓子把')
})
newFn('不虔诚')  
// vue2.0中使用aop  函数劫持重写一些原生的方法
// ex:简单的例子
let beforePushFn = Array.prototype.push;
let aopPush = function(...args) {
    console.log('新push方法执行前')
    //  当前this为arr  ...args为执行时的入参
    //  定义方法时使用...args 会将所有参数保存在args类数组变量, 
    //  执行方法时使用...args 会将当前接受到的类数组变量拆分成 单个变量
    console.log(this ,args, ...args)
    beforePushFn.call(this, ...args)
}
let arr = [1,2,3,4]
aopPush.call(arr, 5,6,7,8)