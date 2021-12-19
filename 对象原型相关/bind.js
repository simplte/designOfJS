Function.prototype.bind2 = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

// 利用call实现 bind
Function.prototype.bind2 = function (context) {
  // 1:保存需要执行的函数
  let that = this;
  // 2：保存剩余参数
  const args = Array.prototype.slice.call(arguments, 1);
  return function () {
    // 3: 通过闭包保存需要执行的目标环境
    // 4: 获取执行时传入的参数
    const bindArgs = Array.prototype.slice.call(arguments);
    return that.call(context, args.concat(bindArgs));
  };
};

Function.prototype.bind1 = function (context) {
  const that = Object.create(context) || window;

  const args = Array.prototype.slice.call(arguments, 1);

  return function () {
    const argsNew = args.concat(Array.prototype.slice.call(arguments));
    return that.call(context, argsNew);
  };
};
