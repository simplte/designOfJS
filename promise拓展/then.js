// then中需要做的操作
// 1：判断成功和失败函数的返回结果
// 2：判断是不是promise 如果是promise就采用他的状态
// 3：如果不是promise直接将结果传递下去

const Promise  = require("./promise");
let p = new Promise((resolve, reject) => {
    resolve(100)
})
// 这里的promise2结合promise实现中的promise2
let promise2 = p.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve('hello')
        },100)
    })
})
promise2.then(data => {
    console.log(22)
    console.log(data)
}, err => {
    console.log(err)
})

// Promise规范中
// 不能将then中执行结果返回当前的赋值的变量
// let  p3 = new Promise((resolve,reject) => {
//     resolve()
// })

// let p4 = p3.then(()=> {
//     console.log(111)
//     return p4
// })
// p4.then(res => {}, err=> {
//     console.log(err)
// })