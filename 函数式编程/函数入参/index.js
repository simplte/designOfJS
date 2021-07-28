
// 1：柯里化函数
// 这个方法的处理方式可以用来固定数量的表单提交验证
// 比如一个表单两个输入,需要用户处理后才能点亮底部按钮
function partial(fn,...presetArgs) {
    return (...lasterArgs) => {
        fn(...presetArgs, ...lasterArgs);
    }
}
let vailddata = null;
let btnShow = false;
let formList = {
    val1: '', 
    val2: ''
}
function btnLign(val1, val2) {
    if(val1 && val2) {
        btnshow = true;
        console.log(btnshow)
    }
}
// 模拟 用户输入第一个表单输入框后掉用partial
vailddata = partial(btnLign, '我是值1');
// 模拟 用户输入第二个表单输入框后 调用vailddata
vailddata('我是值2') // 这时btnshow = true了




// 上述方法比较有局限性，需要固定第一个输入框时传入fn,且还需要固定参数数量
function currying(fn, len= fn.length) {
    return (function next(prevArgs) {
        return function cur(nextArgs) { 
            var args = [...prevArgs,...nextArgs];
            if(args.length >= len){
                return fn(...args)
            }else {
                return next(args);
            }
        }
    })([]);
}
