// 缓存函数
function cached(fn) {
    var cache = {}
    return function cacheFn(str) {
        var res = cache[str]
        return res || (cache[str] = fn(str));
    }
}
function add(a) {
    return ((a+a)/10) +2
}
var start = new Date().getTime();
var sum = cached(add);
var all =0;
for(var i = 0 ;i<10000;i++) {
    all = all + sum(i)
}
var end = new Date().getTime();

console.log('第一次执行时间：',end- start,',执行结果：',all)
var start1 = new Date().getTime();
var all1 = 0
for(var i = 0 ;i<10000;i++) {
    all1 = all1 + sum(i)
}
var end1 = new Date().getTime();

console.log('第一次执行时间：',end1- start1,',执行结果：',all1)
