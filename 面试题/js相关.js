// 1: 防抖
// 触发高频时间后n内函数只会执行一次，如果n秒内再次触发，则会重新计算时间
// 适用场景：登录，发短信，监听键盘，每次触发执行的参数都会有变化时
function debounce(func, delay = 500, ...args) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
// ex:
function test(params) {
    console.log(params)
    console.log('测试防抖')
}
var inp = document.getElementById('inp');
inp.addEventListener('input', debounce(inp, 400));

// 2.节流
// 高频时间触发，在n秒内只会执行一次，所以节流会稀释函数的执行频率
// 适用场景，对于参数变化的关注度低，重点在于搁多少秒执行，比如监听页面滚动
function throttle(fn, delay = 500, ...args) {
    let isStart = false;
    return function () {
        if (isStart) return;
        isStart = true;
        setTimeout(() => {
            fn.apply(this, args);
            isStart = false;
        }, delay)
    }
}
function sayHi(e) {
    console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(sayHi));

// 3. Set Map WeakSet WeakMap 的区别
/**
 * Set: 是集合的数据结构，类似于数组，不过成员是唯一且无序的，没有重复的值
 *  向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。
 *  Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===）
 * WeakSet 允许将弱引用对象存储在一个集合中，
 *  和Set的区别
 *      1: 垃圾回收机制会忽略WeakSet内的对象引用，换句话说就是如果除了WeakSet中没有其他地方引用垃圾回收机制会进行回收
 *      2：只能存储对象引用，不能存值
 * Map：是字段的数据结构
 *      和Set的区别  Set集合是以[value,value]的形式存储数据， Map字段是以[key, value]的形式存储数据
 *      key可以使任意数据类型
 * WeakMap
 *      Weakmap 对象是一组键值对的集合，其中键是弱引用对象，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收（相应的key则变成无效的），
 *      所以，WeakMap 的 key 是不可枚举的。
 *      键只接受对象类型
 */
// 适用Set来进行去重
let arr = [1, 1, 23, 1, 3, 2,]
console.log([... new Set(arr)])
let setArr = new Set();
setArr.add(1)
setArr.add(2)
setArr.add(3)
setArr.has(1);
setArr.delete(1);
// 获取Set数据的长度
console.log(arr.size)

const m2 = new Map([['bar', 1]]);
m2.get('bar')
// 操作方法
// set(key, value)：向字典中添加新元素
// get(key)：通过键查找特定的数值并返回
// has(key)：判断字典中是否存在键key
// delete(key)：通过键 key 从字典中移除对应的数据
// clear()：将这个字典中的所有元素删除
// Map转Array
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log([...map])	// [[1, 1], [2, 2], [3, 3]]


// 4. ES5/ES6 的继承除了写法以外还有什么区别
// 类可以直接通过 __proto__ 寻址到父类
class Super { }
class Sub extends Super { }

const sub = new Sub();

Sub.__proto__ === Super;
// 而通过 ES5 的方式，Sub.__proto__ === Function.prototype
function Super() { }
function Sub() { }

Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

var sub = new Sub();

Sub.__proto__ === Function.prototype;


// 5. commonjs和Esm的区别
// 1：写法区别  commonjs:  exports.xxx  require  （exports实际上是对moudle.exprots的引用）
//              esm: export = xxx  import from   
// 2: commonjs 模块的依赖发生在代码运行阶段
// 3：esm  在编译时就引入了代码模块
// 4: commonjs模块引用后是一个值得拷贝
// 5：esm是一个值得额动态映射


// 6. 全局声明的let const 会在Scopes下的Script里面  而var是在Global里面
// const 和 let会生成块级作用域，可以理解为
let a = 10;
const b = 20;
// 相当于
(function () {
    var a = 10;
    var b = 20;
})()

// 7. iffe中的函数不能够重新赋值，所以b不能被赋值为20 
var b = 10;
(function b() {
    b = 20;
    console.log(b);
})();
// 打印的值时function b

// 8.箭头函数和普通函数的区别
/**
 * 1: 箭头函数写法更加简洁
 * 2：箭头函数不能作为狗做函数
 *      因为箭头函数没有自己的this，不能使用call apply
 *          没有prototype属性
 * 3：箭头函数没有arguments对象，可以用rest参数代替
 * 4：箭头函数的this在定义时就确定了， 并不是调用时所在的对象
 */
let a = 1;
const test = () => {
    console.log(a)
}
function test1() {
    console.log(this.a);
}
let b = {
    a: 22,
    testFn: test,
    test1Fn: test1,
}
b.testFn()
b.test1Fn()

// 9.获取抽象语法书ast的工具  recast
// npm i recast -S
const recast = require("recast");
const code1 = `a.b.c.d`;
const code2 = `a['b']['c']['d']`
// 解析
const ast1 = recast.parse(code1)
const ast2 = recast.parse(code2)
console.log(ast1, ast2)
// 执行就可获取抽象语法树
// {
//     program: Script {
//       type: 'Program',
//       body: [ [ExpressionStatement] ],
//       sourceType: 'script',
//       loc: {
//         start: [Object],
//         end: [Object],
//         lines: [Lines],
//         indent: 0,
//         tokens: [Array]
//       },
//       errors: []
//     },
//     name: null,
//     loc: {
//       start: { line: 1, column: 0, token: 0 },
//       end: { line: 1, column: 7, token: 7 },
//       lines: Lines {
//         infos: [Array],
//         mappings: [],
//         cachedSourceMap: null,
//         cachedTabWidth: undefined,
//         length: 1,
//         name: null
//       },
//       indent: 0,
//       tokens: [
//         [Object], [Object],
//         [Object], [Object],
//         [Object], [Object],
//         [Object]
//       ]
//     },
//     type: 'File',
//     comments: null,
//     tokens: [
//       { type: 'Identifier', value: 'a', loc: [Object] },
//       { type: 'Punctuator', value: '.', loc: [Object] },
//       { type: 'Identifier', value: 'b', loc: [Object] },
//       { type: 'Punctuator', value: '.', loc: [Object] },
//       { type: 'Identifier', value: 'c', loc: [Object] },
//       { type: 'Punctuator', value: '.', loc: [Object] },
//       { type: 'Identifier', value: 'd', loc: [Object] }
//     ]
//   } 

// 10. for 比 foreach 性能好的原因
// 1:百万级数据一样for的性能优势才能显现出来
// 2:forEach 有诸多的参数和上下文需要在执行的时候考虑所以会拖慢性能

// 11. 任何一个 Symbol 类型的值都是不相等的，所以不会被覆盖。 

// 12. var let const 的区别
/**
 * 1：在有var的作用域中，在执行任何语句之前，就已经完成了var 的声明和初始化
 *      这也是为什么var会变量提升的原因
 *    并且var 在声明的时候会在栈内存中提前分配内存，等到实际执行语句执行时在存储变量，如果是引用类型就会存储指向堆内存的指针
 *      var a ; // 完成了声明和初始化，并且栈内存中分配了存储空间
 *      a = 1;  // 栈内存中存储了实际变量值1
 *      a = {b:1} // 在堆内存中分配存储引用类型空间 栈内存中预分配的内存会存储 指向堆内存的指针
 * 2：在有 let const 中的作用域中， 
 *    在其他语句执行之前，只会进行对let const的声明，不会进行初始化,
 *    这也是先读取let/const 声明的变量值，会报错的原因，也是会产生暂时性死区的原因
 * 
 *    同时let/const 在声明的时候不会分配栈内存空间
 *    在let/const 被实际赋值时，先会检查是否有同名变量，有就报错，，没有就会存储实际值或者堆内存的指针
 *      
 */

// 13. 一道内存指针笔试题

function changeObjProperty(o) {
    // 对老地址中的数据进行修改
    o.siteUrl = "http://www.baidu.com"
    // 这时候开辟了一个新的堆内存空间，并且a的栈内存存储的指针指向了新地址
    o = new Object()
    // 这时修改的只是新指针中堆内存的数据,不会影响老地址中的数据
    o.siteUrl = "http://www.google.com"
}
let webSite = new Object();
//   只是将webSite的栈内存指针copy给了changeObjProperty的a形参
changeObjProperty(webSite);
//   因此输出的是baidu
console.log(webSite.siteUrl); // 输出："http://www.baidu.com"

// 14. 一道关于原型挂载的面试题
function Foo() {
    Foo.a = function () {
        console.log(1)
    }
    this.a = function () {
        console.log(2)
    }
}
// 以上只是生命了Foo,并没有执行过

// 在Foo的原型链上，挂载a方法，实力中可以获取到
Foo.prototype.a = function () {
    console.log(3)
}
// 直接在Foo上面挂载了原型方法a，
Foo.a = function () {
    console.log(4)
}
// 这时执行就是上面刚挂载的方法a，输出4
Foo.a();
// 这是执行了Foo方法，之前的挂载在原型链和Foo方法上面的a方法都Foo方法中定义的数据顶替掉
let obj = new Foo();
// 输出2
obj.a();
// 输出1
Foo.a();
