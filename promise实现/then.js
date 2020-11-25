// then中需要做的操作
// 1：判断成功和失败函数的返回结果
// 2：判断是不是promise 如果是promise就采用他的状态
// 3：如果不是promise直接将结果传递下去

const Promise  = require("./promise");
let p = new Promise((resolve, reject) => {
    resolve(100)
})
let p2 = p.then(data => {
    console.log(data)
})
p2.then(data => {
    console.log(data)
}, err => {
    console.log(err)

})