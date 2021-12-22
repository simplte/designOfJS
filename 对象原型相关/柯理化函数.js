function curry(fn, args) {
  const len = fn.length;
  args = args || [];
  return function () {
    var _args = args.slice(0);
    var arg;
    var i;
    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      _args.push(arg);
    }
    if (_args.length < len) {
      return curry.call(this, fn, _args);
    } else {
      fn.apply(this, _args);
    }
  };
}

function curry(fn, args) {
  // 获取函数的参数数量
  const len = fn.length;
  // 第一次执行curry时传入的参数数量
  args = args || [];
  return function () {
    // 通过slice复制之前已经传的参数
    var _args = args.slice(0);
    // 获取再次执行时新传入得参数
    for (var i = 0; i < arguments.length; i++) {
      _args.push(arguments[i]);
    }
    // 参数数量不够，递归执行curry 将函数和 新增加的参数传给curry
    if (_args.length < len) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  };
}
