// forEach
Array.prototype.forEach2 = function(callback, thisArg) {
    if(this == null) {
        throw new Error('this不存在')
    }
    if(typeof callback !== 'function') {
        throw new TypeError('callback 必须为一个函数')
    }
    const O = Object(this);
    let len = O.length >>> 0;
    let k = 0;
    while(k < len) {
        if(k in O) {
            callback.call(thisArg, O[k], k, O);
        }
        k++
    }
}
let test = [1,2,3,4]
test.forEach2((item, indx) => {
    console.log(item);
})
// map
Array.prototype.map2 = function(callback, thisArg) {
    if(this == null) {
        throw new Error('this不存在');
    }
    if(typeof callback !== "function") {
        throw new Error('callback 必须是一个函数')
    }
    const O = Object(this);
    let len = O.length >>> 0;
    let k = 0, res = [];
    while(k < len) {
        if(k in O) {
            let result = callback.call(thisArg, O[k], k, O)
            res[k]=result
        }
        k++
    }
    return res;
}
let val = test.map2(item => {
    return item + 1
})
console.log(val)