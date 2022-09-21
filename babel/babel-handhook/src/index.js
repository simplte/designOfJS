// const test = () => {
//   console.log('123123');
// };
// class Man {
//   constructor() {
//     console.log('123');
//   }
//   getName() {
//     return 'man';
//   }
// }

// function square(n) {
//   console.log('23234');
//   return n * n;
// }

// foo === bar;
// const a = 123;
function save(ctx) {
  xp.message('hello');
  xp.templateFactory.xxx(ctx);
}
function test(ctx) {
  ctx.get('xxx');
  ctx.get(code);
  ctx.get(codes[i]);
  ctx.data;
  this.data = 1;
}

const test1 = (ctx) => {
  console.log(1);
};
setTimeout(function () {
  console.log('123');
}, 100);

function a() {}
function b() {
  a(ctx); // 需要处理
  xp.templateFactory.xxx(ctx);
  const c = function () {};
  c(); // 不用管
  ctx.get('crud').$xxx;
  // -> this.$xxxCrud
}
