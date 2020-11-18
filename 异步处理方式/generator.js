// function* foo() {
//     for(let  i = 0 ; i <=4 ;i++ ) {
//         let x = yield `等一下，i=${i}`;
//     }
// }

// setTimeout(() => {
//     console.log('到这了')
// },100)
// generator方法  通过yield 暂定当前执行 
// 通过执行next方法 返回一个对象 {value: ,  done: false/true}
// 当返回的对象中done为true时表示 执行结束
// var a = foo();
// var b = a.next();
// var c = a.next();
// var d = a.next();
// var e = a.next();
// console.log(e);

// 实际例子

function checkFun() {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve('检查方法一')
        },1000)
    })
}
function checkFunAgain() {
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve('检查方法二')
        },2000)
    })
}

const checkArr  = [checkFun, checkFunAgain]

function* beginCheck(_checkArr) {
    for(let i = 0; i<_checkArr.length;i++) {
        let x = yield _checkArr[i]();
    }
}
// 执行generator方法  将GeneratorObj放入 Object [Generator] {}  个人理解也就是一个个的暂停器，需要next去触发下面的执行
let GeneratorObj = beginCheck(checkArr);
console.log(GeneratorObj)
// run方法就相当于一个触发开关的方法  将之前的执行beginCheck方法存入到beginCheckFun 对象中的开发触发
let run = async (generators)=> {
    var isFinished = false;
    let checkRes = []
    do{
        // 触发已经暂停的开关 触发后返回一个包含done(状态)和value(包含执行结果)的对象
        const { done, value} = generators.next();
        // 因为执行的结果是一个promise 所以使用await 来接受执行结果
        let res = await value;
        if(res) checkRes.push(res);
        // 赋值给isFinished 来更新状态
        isFinished = done
    }while(!isFinished){
        console.log(checkRes,'0000054')
        return checkRes
    }
}

// 执行run方法 此处也返回了一个promise  个人理解应该是async的包裹将方法变成了一个promise
var runResult= run(GeneratorObj)
runResult.then(res=> {
    console.log(res)
})


// 检验一下上述描述中是否是async包裹的方法变成了一个promise
// 检验结果：确实是async将普通方法变成了一个放回promise的方法
let testPromise = async (res) => {
    return 'async 将一个普通的方法变成了返回promise的方法';
}
let  testRes = testPromise(1)
testRes.then(res => {
    console.log(res)
})
