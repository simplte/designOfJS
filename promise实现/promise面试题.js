
// Promise.resolve().then(() => {
//     return new Error('error!!!')
//   }).then(res => {
//     console.log("then: ", res)
//   }).catch(err => {
//     console.log("catch: ", err)
//   })

Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)


  function promise1 () {
    let p = new Promise((resolve) => {
      console.log('promise1');
      resolve('1')
    })
    return p;
  }
  function promise2 () {
    return new Promise((resolve, reject) => {
      reject('error')
    })
  }
  promise1()
    .then(res =>console.log(res))
    .then(() =>console.log('finally1'))
    .catch(err =>console.log(err))
  
  promise2()
    .then(res =>console.log(res))
    .catch(err =>console.log(err))
    .then(() =>console.log('finally2'))



    function runAsync (x) {
        const p = new Promise(r => setTimeout(() => r(x, console.log(x+"resolve")), 1000))
        return p
      }
      function runReject (x) {
        const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x+",rejErr")), 1000 * x))
        return p
      }
      Promise.all([runAsync(1), runAsync(4), runAsync(3), runAsync(2)])
      .then(res =>console.log(res))
      .catch(err =>console.log("err:",err))
      Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
        .then(res =>console.log(res))
        .catch(err =>console.log("err:",err))


/**
 * 总结一下.then()和.race()，
    Promise.all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
    .race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
    Promise.all().then()结果中数组的顺序和Promise.all()接收到的数组顺序一致。
 * 
 */
// async function async1() {
//     console.log("async1 start");
//     await async2();
//     console.log("async1 end");
//   }
//  function async2() {
//      return new Promise((resolve, reject) => {
//         console.log("async2");
//         resolve()
//      }) 
//   }
//   async1();
//   console.log('start')
/**
 * 这里执行的结果为 async1 start   async2  start   async1 end
 * 个人理解await 会阻塞 之后的后面代码的执行，因此会先去执行async2中的同步代码async2，然后跳出async1
 * 跳出async1函数后，执行同步代码start
 * 在一轮宏任务全部执行完之后，再来执行刚刚await后面的内容async1 end。
 * 
 * 可以理解为 await  是 promise.resove(),  await  将需要执行的方法放到了resolve()中  之后需要执行的代码放到了then中
 */

async function async1() {
  console.log("async1 start");
//   await async2();

  Promise.resolve( console.log("async2")).then(resolve => {
    console.log("async1 end");
  })
  
}
async function async2() {
  console.log("async2");
}
async1();
console.log('start')


async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
  }
  async function async2() {
    await new Promise((resolve, reject) => {
       setTimeout(() => {
           resolve(console.log('timer'))
         }, 0)
         console.log("async2");
    }) 
  }
  async1();
  console.log("start")
// ----------------
  async function async1 () {
    console.log('async1 start');
    await new Promise(resolve => {
      console.log('promise1')
    })
    // 相当于是放到 Promise.resolve().then() 的then中执行的 因为 Promise的状态没变所以后面的不会执行
    console.log('async1 success');
    return'async1 end'
  }
  console.log('srcipt start')
  async1().then(res =>console.log(res))
  console.log('srcipt end')
//   在async1中await后面的Promise是没有返回值的，也就是它的状态始终是pending状态，
//   因此相当于一直在await，await，await却始终没有响应
//   srcipt start  
//   async1 start
//   promise1
//   srcipt end


// await async2(); 后面的代码也会执行 
async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
  }
  
  async function async2() {
    console.log("async2");
  }
  
  console.log("script start");
  
  setTimeout(function() {
    console.log("setTimeout");
  }, 0);
  
  async1();
  
  new Promise(function(resolve) {
    console.log("promise1");
    resolve();
  }).then(function() {
    console.log("promise2");
  });
  console.log('script end')

  // script start"
  // async1 start
  // async2
  // promise1
  // script end
  // async1 end
  // promise2
  // setTimeout

  // test start...
  // 执行testAsync
  // promise start...
  // test end...
  // testSometing
  // 执行testAsync
  // promise
  // hello async
  // hello async  testSometing


// --------------------------------------------
  // await后面的内容是一个异常或者错误的话
  // 如果在async函数中抛出了错误，则终止错误结果，不会继续向下执行。
  // 如果想要使得错误的地方不影响async函数后续的执行的话，可以使用try catch
  
  
  // 下面例子 async2后面的代码就不会执行了
  async function async1 () {
    await async2();
    console.log('async1');
    return 'async1 success'
  }
  async function async2 () {
    return new Promise((resolve, reject) => {
      console.log('async2')
      reject('error')
    })
  }
  async1().then(res =>console.log(res))

// 这个例子验证使用try catch 捕获异常  不影响代码执行

async function async1 () {
  try {
    await Promise.reject('error!!!')
  } catch(e) {
    console.log(e)
  }
  console.log('async1');
  return Promise.resolve('async1 success')
}
async1().then(res =>console.log(res))
console.log('script start')

// 或者使用catch捕获后面的异常
async function async1 () {
  // try {
  //   await Promise.reject('error!!!')
  // } catch(e) {
  //   console.log(e)
  // }
  await Promise.reject('error!!!')
    .catch(e =>console.log(e))
  console.log('async1');
  return Promise.resolve('async1 success')
}
async1().then(res =>console.log(res))
console.log('script start')

// 3
// 7
// 4
// 1
// 2

// 5
// reslove