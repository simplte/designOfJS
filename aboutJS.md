#### call、apply、bind
- 用法

```
改变方法内部this的指向
```

- 语法
```
func.call(thisArg, param1, param2, ...)//func是个函数

func.apply(thisArg, [param1,param2,...])

var bindfunc = func.bind(thisArg, param1, param2, ...)

三者一样 入参第一个是需要使用的方法执行上下文
bind和call  与 apply的入参在第二个参数之后  
    bind和call 后面的参数不以数组的形式传入
    apply的参数以数组的形式传入
```
- 用法

```
1：call和apply的用法一样  调用后立即执行 需要改变执行上下文的方法func 并返回执行的结果
2：bind 调用后 返回一个改变执行上下文的方法 不执行该函数
```
- examples

```
1. 判断数据类型
function isType(data, type) {
  const typeObj = {
    "[object String]": "string",
    "[object Number]": "number",
    "[object Boolean]": "boolean",
    "[object Null]": "null",
    "[object Undefined]": "undefined",
    "[object Object]": "object",
    "[object Array]": "array",
    "[object Function]": "function",
    "[object Date]": "date", // Object.prototype.toString.call(new Date())
    "[object RegExp]": "regExp",
    "[object Map]": "map",
    "[object Set]": "set",
    "[object HTMLDivElement]": "dom", // document.querySelector('#app')
    "[object WeakMap]": "weakMap",
    "[object Window]": "window", // Object.prototype.toString.call(window)
    "[object Error]": "error", // new Error('1')
    "[object Arguments]": "arguments"
  };

  let name = Object.prototype.toString.call(data); // 借用Object.prototype.toString()获取数据类型
  let typeName = typeObj[name] || "未知类型"; // 匹配数据类型
  return typeName === type; // 判断该数据类型是否为传入的类型
}

console.log(
  isType({}, "object"), //>> true
  isType([], "array"), //>> true
  isType(new Date(), "object"), //>> false
  isType(new Date(), "date") //>> true
);

2. 类数组对象借用数组的方法
var arrayLike = {
  0: "OB",
  1: "Koro1",
  length: 2
};

Array.prototype.push.call(arrayLike, "添加数组项1", "添加数组项2");

console.log(arrayLike);

3.apply获取数组最大值最小值
const arr = [15, 6, 12, 13, 16];

const max = Math.max.apply(Math, arr); // 16

const min = Math.min.apply(Math, arr); // 6
```
- 手写实现

```
call
Function.prototype.mycall = function(thisArg, ...arg) {
    if(thisArg === null || thisArg === undefined){
        thisArg = window;
    }else {
        thisArg = Object(thisArg)
    }
    const specialMethod = Symbol("anything");
    console.log(this)
    thisArg[specialMethod] = this;
    let result = thisArg[specialMethod](...arg);
    
    delete thisArg[specialMethod];
    return result;
}
let obj = {
  name: "coffe1891"
};

function func() {
  console.log(this.name);
}

func.mycall(obj);//>> coffe1891


apply

/**
 * 用原生JavaScript实现apply
 */
Function.prototype.myApply = function(thisArg) {
  if (thisArg === null || thisArg === undefined) {
    thisArg = window;
  } else {
    thisArg = Object(thisArg);
  }

  //判断是否为【类数组对象】
  function isArrayLike(o) {
    if (
      o && // o不是null、undefined等
      typeof o === "object" && // o是对象
      isFinite(o.length) && // o.length是有限数值
      o.length >= 0 && // o.length为非负值
      o.length === Math.floor(o.length) && // o.length是整数
      o.length < 4294967296
    )
      // o.length < 2^32
      return true;
    else return false;
  }

  const specialMethod = Symbol("anything");
  thisArg[specialMethod] = this;

  let args = arguments[1]; // 获取参数数组
  let result;

  // 处理传进来的第二个参数
  if (args) {
    // 是否传递第二个参数
    if (!Array.isArray(args) && !isArrayLike(args)) {
      throw new TypeError(
        "第二个参数既不为数组，也不为类数组对象。抛出错误"
      );
    } else {
      args = Array.from(args); // 转为数组
      result = thisArg[specialMethod](...args); // 执行函数并展开数组，传递函数参数
    }
  } else {
    result = thisArg[specialMethod]();
  }

  delete thisArg[specialMethod];
  return result; // 返回函数执行结果
};

bind

/**
 * 用原生JavaScript实现bind
 */
Function.prototype.myBind = function(objThis, ...params) {
  const thisFn = this;//存储调用函数，以及上方的params(函数参数)
  //对返回的函数 secondParams 二次传参
  let funcForBind = function(...secondParams) {
    //检查this是否是funcForBind的实例？也就是检查funcForBind是否通过new调用
    const isNew = this instanceof funcForBind;

    //new调用就绑定到this上,否则就绑定到传入的objThis上
    const thisArg = isNew ? this : Object(objThis);

    //用call执行调用函数，绑定this的指向，并传递参数。返回执行结果
    return thisFn.call(thisArg, ...params, ...secondParams);
  };

  //复制调用函数的prototype给funcForBind
  funcForBind.prototype = Object.create(thisFn.prototype);
  return funcForBind;//返回拷贝的函数
};
```

```
for (var i = 1; i <= 5; i++) {
    // 缓存参数
    setTimeout(function (i) {
        console.log('bind', i) //>> 1 2 3 4 5
    }.bind(null, i), i * 1000);
}
这里也用了闭包，我们知道bind会返回一个函数，这个函数也是闭包
```
### 闭包
- 定义
```
内层的作用域访问它外层函数作用域里的参数/变量/函数时，闭包就产生了。
```
- example

```
function A(){
    var count = 0;
    function B(){
       count ++;
       console.log(count);
    }
    return B;//函数B保持了对count的引用
}
var b = A();
b();//>> 1
b();//>> 2
b();//>> 3


count是函数A中的一个变量，它的值在函数B中被改变，B每执行一次，count的值就在原来的基础上累加1。因此，函数A中的count一直保存在内存中，并没有因为函数A执行完毕退出函数调用栈后被JS引擎的垃圾回收器回收掉。

避免闭包导致内存泄漏的解决方法是，在函数A执行完毕退出函数调用栈之前，将不再使用的局部变量全部删除或者赋值为null。
```
- 使用场景介绍

```
1. 返回一个新函数
function sayHello2(name) {
    var text = "Hello " + name; // 局部变量

    var sayAlert = function() {
        console.log(text);
    };

    return sayAlert;
}

var say2 = sayHello2("coffe1891");
say2(); //>> Hello coffe1891

2. 扩展全局对象的方法
function setupSomeGlobals() {
    //私有变量
    var num = 666;

    gAlertNumber = function() {//没有用var和let关键字声明，会成为全局对象的方法
        console.log(num);
    };

    gIncreaseNumber = function() {
        num++;
    };

    gSetNumber = function(x) {
        num = x;
    };
}

setupSomeGlobals();
gAlertNumber(); //>> 666

gIncreaseNumber();
gAlertNumber(); //>> 667

gSetNumber(1891);
gAlertNumber(); //>> 1891

三个全局函数gAlertNumber，gIncreaseNumber，gSetNumber指向了同一个闭包，因为它们是在同一次setupSomeGlobals()调用中声明的。它们所指向的闭包是与setupSomeGlobals()函数关联一个作用域，该作用域包括了num变量的拷贝。也就是说，这三个函数操作的是同一个num变量。

3. 延长局部变量的生命
var report = function(src) {
    var img = new Image();
    img.src = src;
}
report('http://www.xxx.com/getClientInfo');//把客户端信息上报数据
这段代码在运行时，发现在一些低版本浏览器上存在bug，会丢失部分数据上报。原因是Image对象是report函数中的局部变量，当report函数调用结束后，Image对象随即被JS引擎垃圾回收器回收，而此时可能还没来得及发出http请求，所以可能导致此次上报数据的请求失败。

var report = (function() {
    var imgs = [];//在内存里持久化
    return function(src) {
        var img = new Image();
        imgs.push(img);//引用局部变量imgs
        img.src = src;
    }
}());
report('http://www.xxx.com/getClientInfo');//把客户端信息上报数据
```

#### class

```
1：类的所有方法都定义在类的  prototype 属性上面
class A{
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于
A.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
2: class 作为构造函数的语法糖 同时有 prototype 属性和 __proto__ 属性  所有同时存在两条继承链
    1：子类的__proto__属性表示构造函数的继承  指向父类
    2：子类的prototype 属性的__proto__  表示方法的继承 指向父类的prototype
class A {
}

class B extends A {
}

B.__proto__ === A //>> true
B.prototype.__proto__ === A.prototype //>> true
```
### js的事件循环机制

```


事件执行的理解：

程序开始执行，将方法放入调用栈中中 调用栈为空后
开始读取Event Loop（事件循环）的任务队列
主线程任务执行同步代码(相当于执行第一次宏任务)
执行完第一次宏任务之后，在执行下一个宏任务之前 执行微任务 如promise的then方法
然后继续执行宏任务 执行完宏任务在执行下一个宏任务之前检查微任务队列中是否存在微任务 存在即执行否则下一个宏任务队列循环往复

还是拿 setTimeout 举例：

主线程同步执行这个 setTimeout 函数本身。
将负责执行这个 setTimeout 的回调函数的 MacroTask 添加到 MacroTask Queue。
定时器开始工作（实际上是靠 Event Loop 不断循环检查系统时间来判断是否已经到达指定的时间点）。
主线程继续执行其他任务。
当调用栈为空，且定时器触发时，主线程取出 MacroTask 并执行相应的回调函数。

example：
// 执行顺序问题，考察频率挺高
setTimeout(function() {
  console.log(1);
});
new Promise(function(resolve, reject) {
  console.log(2);
  resolve(3);
}).then(function(val) {
  console.log(val);
});
console.log(4);

先执行同步代码
首先，执行new Promise中的console.log(2)，then后面的属于MicroTask所以跳过；
然后，执行console.log(4)。
执行完script这个MacroTask后，执行MicroTask（也即Promise.then） 中的console.log(val)，此时val的值由resolve(3)传递过来，值为3。后面无其他微任务。
执行另一个MacroTask也即定时器setTimeout中的console.log(1)。 根据本文的内容，可以很轻松，且有理有据的猜出写出正确答案：2，4，3，1


宏任务：MacroTask Source 的定义非常的宽泛，常见的鼠标、键盘事件，AJAX，数据库操作（例如 IndexedDB），以及定时器相关的 setTimeout、setInterval 等等都属于 Task Source，所有来自这些 MacroTask Source 的 MacroTask 都会被放到对应的 MacroTask Queue 中等待处理。
微任务：在 Promises/A+ Note 3.1 中提到了 then、onFulfilled、onRejected 的实现方法，但 Promise 本身属于平台代码，由具体实现来决定是否使用 Microtask，因此在不同浏览器上可能会出现执行顺序不一致的问题。不过好在目前的共识是用 Microtask 来实现事件队列
```
### spread  rest 操作符

```
spread 数组展开
console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
console.log([1, ...[2, 3, 4], 5])
//[1,2,3,4,5]
function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42


rest  转化为数组
function push(...items) {
    console.log(items);
}
let a = 4;
push(a, 1, 2, 3)
//[4,1,2,3]
注：rest主要是将函数的多个参数转化成数组，而且只能放在函数参数的最后一个位置，否则报错
test(1,...arg,2) 这样就报错

函数方法定义参数时使用是  rest 转化为数组
函数调用时使用 是 spread 数组展开
```
- 用法

```
1：添加属性
const user = { id: 100, name: 'Howard Moon'}
const userWithPass = { ...user, password: 'Password!' }

2：对象合并 重复属性后面的把前面的覆盖
const partial = { id: 100, name: 'Howard Moon' }
const user = { ...partial, id: 100, password: 'Password!' }
user //>> { id: 100, name: 'Howard Moon', password: 'Password!' }

3：排除对象属性
const noPassword = ({ password, ...rest }) => rest
const user = {
  id: 100,
  name: 'Howard Moon',
  password: 'Password!'
}

noPassword(user) //>> { id: 100, name: 'Howard moon' }
```
### 深拷贝与浅拷贝
- 深拷贝的几种方法
```
1：JSON.parse(JSON.stringify(a))
let a = { x: 1 }
let b = JSON.parse(JSON.stringify(a))

2:Object.assign({},a)
let a = { x: 1 }
let b = Object.assign({},a);
console.log(b)//>> {x:1}
b.x = 2
console.log(b)//>> {x:2}
console.log(a)//>> {x:1}

该方法是用Object.assign对对象进行拼接， 将后续对象的内容插入到第一个参数指定的对象，不会修改第一个参数之后的对象，而我们将第一个对象指定为一个匿名空对象，实现深拷贝。
只能拷贝一层 超过两层就不能实现深拷贝了

3：递归实现深拷贝

deepclone(obj) {
    let result = {};
    let keys = Object.keys(obj);
    let key = null;
    let temp = null;
    for(let i = 0 ; i < keys.length; i++) {
        key = keys[i];
        temp = obj[key];
        if(temp && type of temp == 'object') {
            result[key] = deepclone(temp);
            
        }else {
            result[key] = temp
        }
    }
    return result;
}
```
### 柯理化函数

```
柯里化（Currying）是一种技术，它把接受m个参数的函数变成接受n个参数的函数（0<n<m），并且该函数返回一个新函数，这个新函数接受余下的参数……如此循环，直到最后返回结果。
```

```
// 普通的add函数
function add(x, y) {
    return x + y
}

// Currying后
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}

add(1, 2)           // 3
curryingAdd(1)(2)   // 3
```
- 柯理化函数的优点

```
1：参数复用
正常封装：
// 函数封装后
function check(reg, txt) {
    return reg.test(txt)
}

check(/\d+/g, 'test')       //false
check(/[a-z]+/g, 'test')    //true

柯理化封装：
function curry(reg) {
    return function(txt) {
        return reg.test(txt);
    }
}

var hasNumber = curryingCheck(/\d+/g)
var hasLetter = curryingCheck(/[a-z]+/g)

hasNumber('test1')      // true
hasNumber('testtest')   // false
hasLetter('21212')      // false

2：延迟执行
let add = function(...args) {
    return args.reduce(function(cur,next){
       return cur + next; 
    },0)
}
function curry(fun) {
    let args = [];
    return function result(...rest) {
        if(rest.length == 0) {
            return fun(...args);
        }else {
            args.push(...rest);
            return result;
        }
    }
    
}
let sum = currying(add);

sum(1)(2)(3);   //未真正执行求和运算
sum(4);         //未真正执行求和运算
sum();   //执行求和

bind 的实现实际上就是使用的柯理化函数

Function.prototype.bind = function(context) {
    var _this = this;
    var args = Array.prototype.slice.call(arguments,1);
    return function() {
        _this.apply(context, args);
    }
}
```
- 通用封装

```
// 借用之前的初步柯里化函数，让柯里化后的函数fn有多1段的能力。
var primaryCurrying = function (fn,...args) {
    return function (...args2) {
        var newArgs = args.concat(args2);
        return fn.apply(this, newArgs);
    }
}

/**
* 设计真正的柯里化函数。
* @param fn     即将被柯里化的函数。  
* @param length 用来记录fn应该处理的剩余参数的长度。
*/
function curry(fn, length) {
    <!--fn.length  返回的是函数参数的个数-->
    length = length || fn.length;

    return function (...args2) {
        //若原本要传给fn的参数还未传完
        if (args2.length < length) {
            //合并参数
            var combinedArgs = [fn].concat(args2);
            //递归，进一步柯里化。这里调用了primaryCurrying函数，每调用一次该函数，
            //就可以多“1段”以便可以处理掉剩余的参数，直到把所有应传给fn的参数都处理完。
            return curry(primaryCurrying.apply(this, combinedArgs), length - args2.length);
        } 
        //若原本要传给fn的参数都已经传完，则直接执行fn函数
        else {
            return fn.apply(this, args2);
        }
    };
}
```
