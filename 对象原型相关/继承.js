// 1:原型链继承
function Parent() {
  this.name = '1';
}
Parent.prototype.getName = function () {
  console.log(this.name);
};
function Child() {}
Child.prototype = new Parent();
var child1 = new Child();
child1.getName();
/**
 * 存在的问题：
 * 1：多个实例共享原型属性
 * 2：不能像父类传参
 * */

// 2：构造函数继承
function Parent(name) {
  this.name = name;
}

function Child(name) {
  Parent.call(this, name);
}
let child1 = new Child('bqc');
child1.name;

/**
 * 存在的问题：
 * 1：方法只能在构造函数上面定义
 * */

// 3：组合继承
function Parent(name) {
  this.name = name;
}
Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child(name) {
  // 将父构造函数上面的方法，定义在子构造函数上面，
  // call方法将父构造函数的this指向了 Child，
  // 所以执行 new Child()的时候实际上是往子构造函数上添加父构造函数的属性
  Parent.call(this, name);
}
// 将父构造函数原型上面的属性方法赋值到子类的原型
Child.prototype = new Parent();
// 同时设置子类的原型上面的构造方法为自己
Child.prototype.constructor = Child;
let child1 = new Child('bqc');
child1.getName();

// 4：寄生组合式继承
function Parent(name) {
  this.name = name;
}
Parent.prototype.getName = function () {
  console.log(this.name);
};
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
let F = function () {};
F.prototype = Parent.prototype;
Child.prototype = new F();
Child.prototype.constructor = Child;
let child1 = new Child('bqc', 27);
child1.getName();
/**
 * 寄生组合式继承和组合继承的区别 就在于  寄生上面
 * 1：什么是寄生？
 * 个人理解是不直接实例化父构造函数获取原型属性和方法，
 * 而是将父构造函数原型上的属性方法赋值给一个中间函数
 * 通过实例化中间函数，将父构造函数上面的属性和方法赋值给子构造函数的原型对象上面
 *
 * 这种方式的高效率体现它只调用了一次 Parent 构造函数，
 * 并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性
 */
