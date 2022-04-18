// after函数，个人理解，
// 可以实现针对于一些需要等待几个接口获取到数据后载继续执行相应操作的页面
/* 
function after(times, cb) {
    let paramsObj = []
	return (params) => {
        console.log(`需要再调用${times}次后才能执行`)
        paramsObj = paramsObj.concat(params)
		times--;
        // 执行一次
		if (times <= 0) cb && cb(paramsObj);
	};
}
function realDoFn(...args) {
    console.log(args.flat().join(""))
}
let newFn = after(3,realDoFn);
newFn('卜')
newFn("前")
newFn("程") 
*/

// 柯理化的实现方式  
// 柯理化函数用于对已知参数数量的函数的处理
function curryFn(fn) {
    return function ecxe(...args) {
        if(args.length >= fn.length) {
           return fn.apply(this, args)
        }else {
            return function(...argsAgain) {
               return  ecxe.apply(this, args.concat(argsAgain))
            }
        }
    }
}
let realRunFn = function(a,b,c) {
    console.log(`${a}${b}${c}`)
}
let curriedFn = curryFn(realRunFn);

// curriedFn("卜")("前")("程")
// === 下面的操作
let resFn1 = curriedFn('卜')
resFn1 = resFn1('前')
resFn1 = resFn1('成')

