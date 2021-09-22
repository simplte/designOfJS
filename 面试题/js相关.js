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
let arr = [1,1,23,1,3,2,]
console.log([... new Set(arr)])
let setArr = new Set();
setArr.add(1)
setArr.add(2)
setArr.add(3)
setArr.has(1);
setArr.delete(1);
// 获取Set数据的长度
console.log(arr.size)

const m2 = new Map([['bar',1]]);
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
class Super {}
class Sub extends Super {}

const sub = new Sub();

Sub.__proto__ === Super;
// 而通过 ES5 的方式，Sub.__proto__ === Function.prototype
function Super() {}
function Sub() {}

Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

var sub = new Sub();

Sub.__proto__ === Function.prototype;


// 5. commonjs和Esm的区别
// 1：写法区别  commonjs:  exports.xxx  require  （exports实际上是对moudle.exprots的引用）
//              esm: export = xxx  import from   
// 2: commonjs 模块的依赖发生在代码运行阶段
// 3：esm  在编译时就引入了代码模块