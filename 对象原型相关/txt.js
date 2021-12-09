var obj = {
    name: 'sven'
};

var A = function () {};
A.prototype = obj;

var a = new A();
console.log(a.name); // 输出：sven 
// 我们来看看执行这段代码的时候，引擎做了哪些事情。 
//  首先，尝试遍历对象 a 中的所有属性，但没有找到 name 这个属性。
//   查找 name 属性的这个请求被委托给对象 a 的构造器的原型，
// 它被 a.__proto__ 记录着并且 指向 A.prototype，
// 而 A.prototype 被设置为对象 obj。  
//  在对象 obj 中找到了 name 属性，并返回它的值。 
// 当我们期望得到一个“类”继承自另外一个“类”的效果时，
// 往往会用下面的代码来模拟实现：

var A = function () {};
A.prototype = {
    name: 'sven'
};

var B = function () {};
B.prototype = new A();

var b = new B();
console.log(b.name); // 输出：sven 


function Person() {

}

var person = new Person();

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true

// 注意点：
function Person() {

}
var person = new Person();
console.log(person.constructor === Person); // true

// 为什么是true
/********
 * 1: 在person对象中查找constructor属性 找不到
 * 2：顺着原型链person.__proto__ 找到Person.prototype 找到了constructor属性
 * 3：Person.prototype.constructor = Person 所以 为true
 */

// 你不知道的js上面中说到：
// js中对象的的继承并不是真正意义上的继承，继承是指复制操作，而js
// 只是在两个对象中创建关联关系，叫委托应该更贴切一些


