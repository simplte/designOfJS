// 单一职责
// 只是增加img元素，并且设置img 的src属性
var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function (src) {
            console.log('执行顺序4:', src)
            imgNode.src = src;
        }
    }
})();
// 代理的作用，将属性设置和图片预加载两个功能隔离开来
var proxyImage = (function () {
    var img = new Image;
    img.onload = function () {
        console.log('执行顺序3:', 333) // onload是在图片加载完了以后立即执行的方法
        myImage.setSrc(this.src); // 执行上个对象中的setSrc方法给imgnode节点添加正需要展示的图片
    }
    return {
        setSrc: function (src) {
            console.log('执行顺序1:', 111)
            myImage.setSrc('./location.webp'); //先给img节点添加一个等待图
            img.src = src; // 将需要加载的图片，通过当前  img 加载，img加载完了 立即执行 img.load()方法
            console.log('执行顺序2:', '222')
        }
    }
})();

proxyImage.setSrc('https://apic.douyucdn.cn/upload/avanew/face/201707/04/18/0705688081e5c9cecfe7bec3dd319319_middle.jpg');
// ------------------------
// 缓存代理的例子——计算乘积 
var mult = function () {
    console.log('开始计算乘积');
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
};
var proxyMult = (function () {
    var cache = {};
    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = mult.apply(this, arguments);
    }
})();

proxyMult(1, 2, 3, 4); // 输出：24
proxyMult(1, 2, 3, 4); // 输出：24 
// =================================
// 用高阶函数动态创建代理 
/**************** 计算乘积 *****************/
var mult = function () {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
};

/**************** 计算加和 *****************/
var plus = function () {
    var a = 0;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a + arguments[i];
    }
    return a;
};

/**************** 创建缓存代理的工厂 *****************/
var createProxyFactory = function (fn) {
    var cache = {};
    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = fn.apply(this, arguments);
    }
};

var proxyMult = createProxyFactory(mult),
    proxyPlus = createProxyFactory(plus);
console.log(proxyMult)
console.log(proxyPlus)
console.log(proxyMult(1, 2, 3, 4)); // 输出：24
console.log(proxyMult(1, 2, 3, 4)); // 输出：24 
console.log(proxyPlus(1, 2, 3, 4)); // 输出：10 
console.log(proxyPlus(1, 2, 3, 4)); // 输出：10 