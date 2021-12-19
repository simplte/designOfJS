function createNew() {
  // 1:创建实例对象
  let obj = new Object(null);
  // 2：获取构造函数
  const Construtor = [].shift.call(arguments);
  // 3: 根据原型链的规则 实例的 __proto__ 要指向构造函数的 prototype 属性
  obj.__proto__ = Construtor.prototype;
  // 4：执行构造函数，通过call改变构造函数创建的实例对象的作用域
  //   使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
  const ret = Construtor.apply(obj, arguments);
  // 5：如果ret是一个对象则返回具体值，不是的话返回实例
  return typeof ret === 'object' ? ret : obj;
}

function CreatePerson(name, age) {
  this.name = name;
  this.age = age;
  this.jump = function jump() {
    console.log('调高');
  };
}
CreatePerson.prototype.speak = function () {
  console.log('我得会说话');
};
const xiaohong = createNew(CreatePerson, 'xiaohong', 12);
console.log(xiaohong.name);
xiaohong.speak();
xiaohong.jump();
