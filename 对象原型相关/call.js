Function.prototype.call1 =  function (arguments) {
    const context= arguments[0] || window;
    context.fn = this;
    let res = null;
    let args = [];
    if(arguments.length == 1) {
        res = context.fn();
        delete context.fn;
        return res;
    }
    for(let i = 1; i<arguments.length; i++) {
        args.push('arguments['+i+']');
    }
    res = eval('context.fn(' + args + ')');
    delete context.fn;
    return res
};


Function.prototype.call2 = function(thisObj, ...args) {
    // 要执行函数所在的环境对象
    const context = thisObj || window;
    // 用来保存函数到需要执行对象中的key值
    const sykey = Symbol('onlykey');
    // 保存需要执行的函数到目标环境对象中
    context[sykey] = this;
    // 执行函数拿到结果
    let res = context[sykey](...args);
    // 删除保存的函数
    delete context[sykey];
    return res;
}