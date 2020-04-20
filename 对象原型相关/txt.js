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