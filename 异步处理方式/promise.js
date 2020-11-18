/**
 *  promise中错误处理  异常捕获
 */


/**
 * promise.then(onFulfilled, onRejected)
 * 
 * promise.then中两个参数  也是两个回调
 * onFulfilled promise方法通过resolve  改变状态
 * onRejected promise方法通过reject 改变状态
 */


// 1：promise中执行报错导致没有resolve 也没有reject
function case1() {
    // 模拟promise执行时报错
    var p1 = new Promise((resolve, reject) => {
       throw Error('执行出错了')
    })

    // 三种异常捕获的方法 异常出现后 
    // 1： try catch 
    // try {
    //     p1.then((res) => {
    //         console.log('p1Resolve:',res)
    //         return 1
    //     },e => {
    //         console.log(e,'---p1');
    //         return '第一个promise错误返回的数据'
    //     }).then(a => {
    //         console.log('接收到第一个promise返回的数据：',a)
    //     })
    // } catch (error) {
    //     console.log(error,'--promise执行中的错误')
    // }
    

    // 2：在执行最后catch 捕获到异常 
    p1.then((res) => {
        console.log('p1Resolve:',res)
        return 1
    },e => {
        console.log(e,'---第一个Promise的报错');
        return 2
    }).then(a => {
        console.log(a)
    }).catch(err => {
        console.log(err,'--promise执行中的错误')
    })
}
case1()

// 如果Promise方法没有通过resolve 和reject改变当前状态  则默认是reject 改变的状态 在.then 方法中会走第二个回调方法 也就是onRejected
function case2(){
    //  在promise1的onRejected中处理了p1的异常，但是又抛出了一个新异常，那么promise2的onRejected会抛出这个异常
    var p1 = new Promise((resolve, reject)=>{
        throw Error('p1 error')
    })
    p1.then((res)=>{
        return 1
    }, (e)=>{
        console.log(e)
        throw 'error in p1 onReject'
    }).then((a)=>{}, (e)=>{
        // 如果p1的 onReject 抛出了异常
        console.log(e)
    })
}
case2()


// 如果promise1是rejected态的，并且没有定义onRejected，则promise2也会是rejected态的。
// 如果第一个.then 方法中没有处理promise的异常  会被 顺延到第二个.then() 的onRejected 中处理 下面的.then 方法有处理异常的方法（即有onRejected）
function case3(){
    var p1 = new Promise((resolve, reject)=>{
        throw 'p1 error'
    })

    p1.then((res)=>{
        return 1
    }).then((a)=>{
        console.log('not run:', a)
    }, (e)=>{
        // 如果p1的 onReject 抛出了异常
        console.log('handle p2:', e)
    })
}
// 如果所有的then都没有处理异常  异常会被最后的catch捕获  且后面的then方法不会被执行
function case4(){
    var p1 = new Promise((resolve, reject)=>{
        throw 'p1 error'
    })

    p1.then((res)=>{
        return 1
    }).then((a)=>{
        console.log('not run:', a)
    }).catch(err => {
        // 如果p1的 onReject 抛出了异常
        console.log('handle p1:', err)
    })
}

// 如果promise1是fulfilled态但是onFulfilled和onRejected出现了异常，promise2也会是rejected态的，并且会获得promise1的被拒绝原因或异常。
function case5(){
    var p1 = new Promise((resolve, reject)=>{
        resolve(1)
    })
    p1.then((res)=>{
        console.log(res)
        throw 'p1 onFull error'
    }).then(()=>{}, (e)=>{
        console.log('handle p2:', e)
        return 123
    })
}