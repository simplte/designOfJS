Function.prototype.mycall = function(obj , ...arr) {
    if(obj === undefined || obj === null) {
        obj = window;
    }else {
        obj = Object(obj)
    }
    const onlyVal = Symbol('callFun');
    obj[onlyVal] = this; // this 就是调用mycall的function
    const result = obj[onlyVal](...arr);
    delete obj[onlyVal];
    return result;
}

Function.prototype.myapply = function(obj) {
    if(obj === undefined || obj === null) {
        obj = window;
    }else {
        obj = Object(obj);
    }
    function isArrLike(_arr) {
        if(_arr && typeof _arr === "object"
        && isFinite(_arr.length)
        && _arr.length >= 0
        && _arr.length === Math.floor(_arr.length)
        && _arr.length < 4294967296
        ){
            return true
        }
        return false;
    }
    const onlyVal = Symbol('callFun');
    obj[onlyVal] = this;
    let arr = arguments[1];
    let result ;
    if(arr) {
        if(!Array.isArray(arr) && !isArrLike(arr)) {
            throw new TypeError('第二个参数必须为数组或者类数组')
        }else {
            result = obj[onlyVal](...arr);
        }
    }else {
        result = obj[onlyVal]();
    }
    delete obj[onlyVal];
    return result;
}

Function.prototype.myBind = function(objThis, ...params) {
    const thisFn = this;//存储调用函数，以及上方的params(函数参数)
    //对返回的函数 secondParams 二次传参
    let funcForBind = function(...secondParams) {
      //检查this是否是funcForBind的实例？也就是检查funcForBind是否通过new调用
      const isNew = this instanceof funcForBind;
  
      //new调用就绑定到this上,否则就绑定到传入的objThis上
      const thisArg = isNew ? this : Object(objThis);
  
      //用call执行调用函数，绑定this的指向，并传递参数。返回执行结果
      return thisFn.call(thisArg, ...params, ...secondParams);
    };
  
    //复制调用函数的prototype给funcForBind
    funcForBind.prototype = Object.create(thisFn.prototype);
    return funcForBind;//返回拷贝的函数
  };