function fn(nums) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(nums * 2)
      }, 1000)
    })
  }
function *gen() {
    const num1 = yield fn(1);
    const num2 = yield fn(2);
    const num3 = yield fn(3);
    return num3;
}
function generatorToAsync(genFun) {
    return function() { 
        const gen = genFun.apply(this, arguments);
        console.log(gen);
        return new Promise(function(resolve, reject) {
            function run (key, arg) {
                let res ;
                try {
                    res = gen[key](arg);
                } catch (error) {
                    return reject(error);                    
                }
                const {value, done} = res;
                if(done) {
                    return resolve(value);
                }else {
                    return Promise.resolve(value).then(val => {
                        run('next', val);
                    },
                        err => {
                            go('thorw', err)
                        }
                    )
                }
            }
            run('next');
        })
    }
}
const genToAsync = generatorToAsync(gen)
const asyncRes = genToAsync()
console.log(asyncRes) // Promise
asyncRes.then(res => console.log(res)) // 8

function test() {
    return Promise.resolve('123').then(res => {
        console.log('234')
    })
}
test()