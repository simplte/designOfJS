// yield相当于暂停器  到这之前就不执行了
// next相当于开关  让generator方法执行到下一个yeild暂停器之前
function* read() {
    let a = yield 'hello';
    console.log(a); 
    let b = yield 'world';
    console.log(b) 
}
let it = read();

// 如果以下这样执行所有的console打印出来的都是undefined
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())


// 如果以下这样执行就可以打印出来值
// console.log(it.next('')) // 第一次执行next 执行 到a 赋值之前，第一次next方法传参是没有意义的
// console.log(it.next('传给a的值')) // 第二次执行next 并且有参数传过去 参数会被赋值给a
// console.log(it.next('传给b的值')) // 第三次执行next 并且有参数传过去 参数会被赋值给c
const fs = require('fs').promises;
function getFileList(urlArr) {
    let readArr = [];
    urlArr.forEach(element => {
        readArr.push(fs.readFile(element,'utf8'))
    });
    return readArr
}
let fileArr = getFileList(['./fs/a.txt','./fs/b.txt'])
function* readFile(_fileArr) {
    for(let i = 0 ; i<_fileArr.length; i++) {
        yield _fileArr[i]
    }
}
let getReadContent = readFile(fileArr);
// 使用asyn await
async function startRead(generatorArr) {
    let isEnd = false;
    let res = [];
    do {
        let {value, done} = generatorArr.next();
        let val = await value;
        res.push(val);
        isEnd = done;
    } while (!isEnd) { // 当while语句中的条件为false时停止执行
        return res
    };
}
let runRes = startRead(getReadContent);
console.log(runRes)
runRes.then(res => {
    console.log(res)
})

// 不使用async await
//  function startRead(generatorArr) {
//     let isEnd = false;
//     let res = [];
//     do {
//         let {value, done} = generatorArr.next();
//         let val =  value;
//         res.push(val);
//         isEnd = done;
//     } while (!isEnd) { // 当while语句中的条件为false时停止执行
//         return res
//     };
// }
// let runRes = startRead(getReadContent);
// console.log(runRes)
// Promise.all(runRes).then(res => {
//     console.log(res)
// })