// const Promise = require('./promise');
// finally的用法
// 1： 不管promise执行成功还是失败都执行的finally方法
// 2：finally后还可以接着.then  说明finally是一个promise实例
// 3：finally 方法的参数中还可以返回一个promise实例 会等当前参数中的promise实例执行后继续往下执行


// promise.resolve()的用法
// promise.resolve() 返回的也是一个promise实例
//  Promise.resove(cb()) 这个方法中的cb 如果也是Promise的实例 promise.resolve() 方法会等cb这个promise 执行完了继续往下执行
//  cb如果是promise 执行完了以后可以通过 Promise.resove(cb()).then(res =>  cb成功的执行结果) 拿到cb执行后的结果

let  p = new Promise((resolve, reject) => {
    setTimeout(()=> {
        resolve(100)
    },100)
})
Promise.prototype.finally = function(cb) {
    return p.then(data => {
        return  Promise.resolve(cb()).then((res) =>  {
            console.log(res)
            return data
        })
         // finally 传入的函数 无论成功或者失败都会执行
    }, err=> {
        return Promise.resolve(cb()).then(() => {
            throw err
        })
        
    })
}
p.finally(res => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(11)
        },100)
     })
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(`catch${err}`)
})