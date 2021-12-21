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
