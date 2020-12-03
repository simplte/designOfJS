const fs = require('fs')
const Promise = require('./promise');
function read(url) {
    let dfd = Promise.defer();

    // return new Promise((resolve, reject) =>{
        fs.readFile(url, 'utf8', function(err, data) {
           if(err) dfd.reject(err);
           dfd.resolve(data)
        });
    // })
    return dfd.promise;
}
// 实现promise.all方法

function isPromise(_val) {
    if(typeof _val === 'object' && _val !== null  || typeof _val == 'function') {
        if(_val.then === 'function') return true;
        return false;
    }else {
        return false
    }
}
Promise.all = function(vals) {
    return new Promise((resolve, reject) => {
        let resultArr = [];
        let index = 0;
        function addResVal(key, val) {
            resultArr[key] =val;
            if(++index == vals.length) {
                resolve(resultArr)
            }
        }
        for(let i = 0 ;i < vals.length; i++ ){
            let curval = vals[i];
            console.log(isPromise(curval))
            if(isPromise(curval)) {
                curval.then(res => {
                    addResVal(i,res)
                }, reject())
            }else {
                addResVal(i, curval)
            }
        }
    })
}

Promise.all([1,2,3,4,read('./fs/a.txt'), read('./fs/b.txt'),7,8]).then(res => {
    console.log(res)
})