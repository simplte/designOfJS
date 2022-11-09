// //index.js

// var a = require('./a');
// console.log('入口模块引用a模块：', a);

// // a.js
// exports.a = '原始值-a模块内变量';
// var b = require('./b');
// console.log('a模块引用b模块：', b);
// exports.a = '修改值-a模块内变量';

// // b.js
// exports.b = '原始值-b模块内变量';
// var a = require('./a');
// console.log('b模块引用a模块', a);
// exports.b = '修改值-b模块内变量';
// // --------------
// //index.js
// var a = require('./a');
// var b = require('./b');

// // a.js
// module.exports.a = '原始值-a模块内变量';
// console.log('a模块执行');
// var c = require('./c');

// // b.js
// module.exports.b = '原始值-b模块内变量';
// console.log('b模块执行');
// var c = require('./c');

// // c.js
// module.exports.c = '原始值-c模块内变量';
// console.log('c模块执行');

// // ------------
// import * as a from './a.mjs';
// console.log('入口模块引用a模块：', a);

// // a.mjs
// let a = '原始值-a模块内变量';
// export { a };
// import * as b from './b.mjs';
// console.log('a模块引用b模块：', b);
// a = '修改值-a模块内变量';

// // b.mjs
// let b = '原始值-b模块内变量';
// export { b };
// import * as a from './a.mjs';
// console.log('b模块引用a模块：', a);
// b = '修改值-b模块内变量';

// // ------------
// // index.mjs
// import * as a from './a.mjs';
// console.log('入口模块引用a模块：', a);

// // a.mjs
// import * as b from './b.mjs';
// let a = '原始值-a模块内变量';
// export { a };
// console.log('a模块引用b模块：', b);
// a = '修改值-a模块内变量';

// // b.mjs
// import * as a from './a.mjs';
// let b = '原始值-b模块内变量';
// export { b };
// console.log('b模块引用a模块：', a);
// b = '修改值-b模块内变量';

// ==============
// 解析模块相互引用的文章
// https://mp.weixin.qq.com/s/d1hzwqwtIc51OadwD6vxbw
