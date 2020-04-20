// 内部迭代器
var each = function (ary, callback) {
    for (var i = 0, l = ary.length; i < l; i++) {
        if (callback(i, ary[i]) === false) { // callback 的执行结果返回 false，提前终止迭代          
            break;
        }
    }
};

each([1, 2, 3, 4, 5], function (i, n) {
    if (n > 3) { // n 大于 3 的时候终止循环   
        return false;
    }
    console.log(n); // 分别输出：1, 2, 3 
})