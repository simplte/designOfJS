// promise特点
// 是一个类
// 1：有三个状态 等待  成功  失败  一旦改变不能改变
// resolve 代表成功 reject 代表失败
// 2：每一个promise实例都有一个then方法
// 3:如果new Promise的时候 报错了，会变成失败状态 （报错也算失败状态）
const Promise  = require("./Promise/1.promise");

let promise = new Promise((resolve,reject)=> { // 执行器，立即执行
    setTimeout(()=> {
        resolve('成功了')
    },1000)
})
promise.then(data => { // 成功
    console.log('成功1：',data)
}, err => { // 失败
    console.log('失败1：',err)
})
promise.then(data => { // 成功
    console.log('成功2：',data)
}, err => { // 失败
    console.log('失败2：',err)
})
promise.then(data => { // 成功
    console.log('成功3：',data)
}, err => { // 失败
    console.log('失败3：',err)
})
promise.then(data => { // 成功
    console.log('成功4：',data)
}, err => { // 失败
    console.log('失败4：',err)
})