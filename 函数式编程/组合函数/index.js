// 组合函数工具
function compose(...fns) {
    return function composed(args) {
        let list = [...fns];
        const len = list.length;
        while (len > 0) {
            args = list.pop()(result);
        }
        return args;
    }
}

function compose(...fns) {
    return function composed(args) {
        let list = [...fns];
        let len = list.length
        while (len > 0) {
            args = list.pop()(args);
        }
        return result;
    }
}
// 个人思考在实际业务开发中的使用：
// 多个接口顺序调用时，且前一个接口的响应值是下一个接口的参数时可以这样使用
// 不过如果要是处理异步调用,上面的方法需要改造一下成async await的形式


// 2:使用reduce 改写上面的方法
function compose(...fns) {
    return function composed(args) {
        return fns.reverse().reduce((res, fn) => {
            return fn(res)
        }, args)
    }
}
// 2.1 解决上面的用reduce改写的方法只能用来第一个函数单个参数的问题
function compose(...fns) {
    return fns.reduce((fn1, fn2) => {
        return function composed(...args) {

            return fn2(fn1(...args))
        }

    })
}

// 使用reduce实现sku类型不确定的情况下，所有结果的处理
let list1 = [1, 2, 3, 4]
let list2 = [1, 2, 3, 4, 5]
let list3 = [1, 2, 3, 4, 5]
function handleAllType(...args) {
    return args.reduce((list1, list2) => {
        if (!list1.length) return list2
        let res = [];
        list1.forEach(x => {
            list2.forEach(y => {
                res.push(`${x}_${y}`)
            })
        })
        return res;
    }, [])
}
console.log(handleAllType(list1, list2, list3))

// 3 使用递归解决组合
function compose(...fns) {
    // 完成最后两个参数
    var [ fn1, fn2, ...rest ] = fns.reverse();

    var composedFn = function composed(...args){
        return fn2( fn1( ...args ) );
    };
    console.log(composedFn)
    if (rest.length == 0) return composedFn;

    return compose( ...rest.reverse(), composedFn );
}
function test1(a) {
    console.log(a)
}
function test2(a) {
    console.log(a)
}
function test3(a) {
    console.log(a)
}
function test4(a) {
    console.log(a)
}
compose(test1, test2, test3, test4);

// 4 pipe 从左到右的入参顺序进行执行
function pipe(...fns) {
    return function piped(args) {
        let list = [...fns];
        let len = list.length;
        while (len > 0) {
            args = list.shift()(args)
        }
        return args;
    }
}
// 5:代码抽离的目的除了方便重用，还有就是将相关逻辑独立起来，让我们在关注一部分逻辑时不被其他的逻辑影响到
// 函数组合是一种定义函数的模式，该函数将一个函数调用的输出路由到另一个函数调用，并将其输出路由到另一个函数调用，以此类推。
// 个人理解：一个函数的输出作为另外一个函数的输入

function test(obj) {
    obj.a = 1;
    return obj.a +1;
}
let obj1 = {a: 2}
test(obj1);
console.log(obj1)

// 6:由于handlefn 是一个不纯的方法，这种写法会导致 test1被改变
let test1 = {a:1,b:2}
function handlefn(obj) {
    obj.a +=1;
    return obj.a + obj.b
}
console.log(handlefn(test1))
console.log(test1)

// 6.1  使用const 一样会导致test2 数据发生改变
const test2 =  {a:1,b:2}
console.log(handlefn(test2))
console.log(test2)
// 6.2 解决不纯函数带来的问题 解决不纯函数带来的不可预知的问题的方式
//  使用Object.freeze() 来声明一个浅层不可改变的对象
const test3 =  Object.freeze({a:1,b:2})
console.log(handlefn(test3))
console.log(test3)
// 6.3 使用 Object.freeze() 如果声明一个深层的对象
// ，并且使用一个不纯的函数去修改深层的数据 
// 使用Object.freeze() 声明的对象一样会被改变
let test4 = Object.freeze({a:1,b:{c:{d:2}}})
function handlefn(obj) {
    obj.b.c.d +=1;
    return obj.a + obj.b.c.d
}
console.log(handlefn(test4))
console.log(test4)
// 6.4 彻底解决此类问题，
// 个人理解：改写不纯函数，1：使用深拷贝 拷贝参数值  2：使用原型方法声明一个新值（本质上同第一点相同）
let test4 = {a:1,b:{c:{d:2}}}
function handlefn(obj) {
    let args = JSON.parse(JSON.stringify(obj))
    args.b.c.d +=1;
    return args.a + args.b.c.d
}
console.log(handlefn(test4))
console.log(test4)