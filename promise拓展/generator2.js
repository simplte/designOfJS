// let fs = require('fs').promises;
// function* read() {
//     console.log(1)
//     let content = yield fs.readFile('./fs/c.txt','utf-8')
//     console.log(2)
//     let res = yield fs.readFile(content, 'utf-8');
//     console.log(3)
//     return res;
// }

// function co(it) {
//     console.log(it)
//     return new Promise((resolve, reject) => {
//         function next(data) {
//             let {value, done} = it.next(data);
//             console.log(value,'done:',done)
//             if(!done) {
//                 Promise.resolve(value).then(res => {
//                     console.log('val:', res)
//                     next(res);
//                 })
//             }else {
//                 resolve(data)
//             }
//         }
//         next()
//     })
// }
// co(read()).then(data => {
//     console.log(data)
// })

// fs 的.promises方法实现

const fss = require('fs');
function promise(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => [
            fn(...args, function(err, data) {
                if(err) {
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        ])
    }
}
function promises(obj) {
    for(let key in obj) {
        if(typeof obj[key] ==='function') {
            obj[key] = promise(obj[key]) // AOP
        }
    }
}
promises(fss);
fss.readFile('./fs/a.txt','utf-8').then(res => {
    console.log(res)
})

let pro = new Promise((resolve,reject) => {
    reject(111)
})

pro.catch(err => {
    return err
}).then(res => {
    console.log(res)
})
