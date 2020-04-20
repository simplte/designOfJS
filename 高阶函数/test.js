// 高阶函数是指至少满足下列条件之一的函数。 
// 函数可以作为参数被传递；
//  函数可以作为返回值输出

//函数作为参数传递

// 1:回调函数
// eg1


// var getUserInfo = function (userId, callback) {
//     $.ajax('http://xxx.com/getUserInfo?' + userId, function (data) {
//         if (typeof callback === 'function') {
//             callback(data);
//         }
//     });
// }

// getUserInfo(13157, function (data) {
//     alert(data.userName);
// });

// eg2


// var appendDiv = function () {
//     for (var i = 0; i < 100; i++) {
//         var div = document.createElement('div');
//         div.innerHTML = i;
//         document.body.appendChild(div);
//         div.style.display = 'none';
//     }
// };

// appendDiv();
/* 
把 div.style.display = 'none'的逻辑硬编码在 appendDiv 里显然是不合理的，
appendDiv 未免 有点个性化，
成为了一个难以复用的函数，
并不是每个人创建了节点之后就希望它们立刻被隐藏

*/
// 改造为
// var appendDiv = function (callback) {
//     for (var i = 0; i < 100; i++) {
//         var div = document.createElement('div');
//         div.innerHTML = i;
//         document.body.appendChild(div);
//         if (typeof callback === 'function') {
//             callback(div);
//         }
//     }
// };

// appendDiv(function (node) {
//     node.style.display = 'none';
// });

// --------------------------
// 2： Array.prototype.sort

[1, 4, 3].sort(function (a, b) {
    return a - b;
});
// 输出: [ 1, 3, 4 ] 


//从大到小排列 

[1, 4, 3].sort(function (a, b) {
    return b - a;
});

// 输出: [ 4, 3, 1 ] 

// ---------------------------------------------------------



// 函数作为返回值输出

// 1. 判断数据的类型 
// var Type = {};

// for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
//     (function (type) {
//         Type['is' + type] = function (obj) {
//             return Object.prototype.toString.call(obj) === '[object ' + type + ']';
//         }
//     })(type)
// };

// console.log(Type.isArray([]))
// Type.isArray([]); // 输出：true 
// Type.isString("str"); // 输出：true 


// 2 getSingle 
// var getSingle = function (fn) {
//     var ret;
//     return function () {
//         // this：getSingle函数
//         // arguments：getSingle函数内的参数
//         return ret || (ret = fn.apply(this, arguments));
//     };
// };

/*

这个高阶函数的例子，既把函数当作参数传递，
又让函数执行后返回了另外一个函数。
我们 可以看看 getSingle 函数的效果

 */
// var getScript = getSingle(function () {
//     console.log(111)
// });

// var script1 = getScript();
// var script2 = getScript();

// console.log(script1 === script2); // 输出：true  

// 3 高阶函数实现AOP 
// 4 柯理化函数 
// var cost = (function () {
//     var args = [];

//     return function () {
//         if (arguments.length === 0) {
//             var money = 0;
//             for (var i = 0, l = args.length; i < l; i++) {
//                 money += args[i]
//             }
//             return money;
//         } else {
//             [].push.apply(args, arguments);
//         }
//     }

// })();

// cost(100)

var currying = function (fn) {
    var args = [];

    return function () {
        if (arguments.length === 0) {
            console.log(args);
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }

};

var cost = (function () {
    var money = 0;

    return function () {
        console.log(arguments);
        for (var i = 0, l = arguments.length; i < l; i++) {
            money += arguments[i];
        }
        return money;
    }

})();

var cost1 = currying(cost);
cost1(100)
cost1(200)
// cost1(300)
// console.log(cost1());
// console.log(cost1());
// ----------------------------------------------------------------------

// uncurrying函数


// Function.prototype.uncurrying = function () {
//     var self = this; // Array.prototype.push方法
//     return function () {
//         console.log(arguments) // push(obj,2)调用时  传进来的两个参数
//         var obj = Array.prototype.shift.call(arguments); // shift头部截取传进来的obj 参数出来
//         console.log(obj)
//         console.log(arguments) // 原本的arguments类数组中  只剩下push(obj,2) 第二个传进来的参数 2
//         return self.apply(obj, arguments); //调用时利用闭包封锁在self中的Array.prototype.push 方法  将两个参数合并，并且抛出
//     };
// };
// var push = Array.prototype.push.uncurrying();


// var obj = {
//     "length": 1,
//     "0": 1
// };

// push(obj, 2);
// console.log(obj)

// var b = [1, 2, 3]
// let a = [].shift.call(b)
// console.log(a)
// console.log(b)

//    uncurrying 的另外一种实现方式： 
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        return Function.prototype.call.apply(self, arguments);
    }
};

var push = Array.prototype.push.uncurrying();


var obj = {
    "length": 1,
    "0": 1
};

push(obj, 2);
// console.log(obj)

// -----------------------------------------------------------

// 节流

var throttle = function (fn, interval) {
    var __self = fn, // 保存需要被延迟执行的函数引用         
        timer, // 定时器         
        firstTime = true; // 是否是第一次调用 
    return function () {
        var args = arguments,
            __me = this;
        console.log(args)
        if (firstTime) { // 如果是第一次调用，不需延迟执行 
            __self.apply(__me, args);
            return firstTime = false;
        }
        if (timer) { // 如果定时器还在，说明前一次延迟执行还没有完成    
            return false;
        }
        timer = setTimeout(function () { // 延迟一段时间执行   
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);
        }, interval || 500);
    };

};

var jieliu = throttle(function () {
    console.log(1);


}, 500)
jieliu(111)
jieliu()
jieliu()
jieliu()
jieliu()
// --------------------------------------------
// 4. 分时函数
var timeChunk = function (ary, fn, count) {

    var obj, t;

    var len = ary.length;

    var start = function () {
        for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
            console.log(ary)
            var obj = ary.shift();
            console.log(obj)
            fn(obj);
        }
    };

    return function () {
        t = setInterval(function () {
            if (ary.length === 0) { // 如果全部节点都已经被创建好           
                return clearInterval(t);
            }
            start();
        }, 200); // 分批执行的时间间隔，也可以用参数的形式传入 

    };

};

var ary = [];

for (var i = 1; i <= 100; i++) {
    ary.push(i);
};

var renderFriendList = timeChunk(ary, function (n) {
    // console.log(n)
}, 8);

renderFriendList();