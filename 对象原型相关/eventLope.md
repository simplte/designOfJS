#### 个人理解事件循环机制

```
1: 首先抽象成三个盒子分别是：一个执行栈，两个任务队列（宏任务队列，微任务队列）这三个盒子
2：执行栈也叫执行上下文栈，会存放执行函数的上下文对象
3：在执行一个个函数方法时，会存在同步方法和异步方法
   同步方法就很好理解，遵循后进先出的原则，执行完了以后就出栈，完成调用
   异步方法时，就出现了宏任务和微任务的区别
   当执行栈中的函数在执行异步任务时，会对异步任务进行区分，
   如果是宏任务则将该任务加入到宏任务队列中，异步任务也是如此
   当前执行上下文栈任务执行完成之后，会先遍历执行微任务队列中的任务,清空微任务队列
   然后遍历宏任务队列，在执行宏任务时，可能会产生新的微任务
   执行完当前宏任务，在执行宏任务队列中的下一个任务时，再去清空微任务队列，
   如此循环往复
```

```
setTimeout(function () {
  console.log(1);
  new Promise((resolve, reject) => {
    console.log('6');
    resolve(5);
  }).then((res) => {
    console.log(res);
  });
});
setTimeout(function () {
  console.log('7');
});

new Promise(function (resolve, reject) {
  console.log(2);
  resolve(3);
}).then(function (val) {
  console.log(val);
});

```
