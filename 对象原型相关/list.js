// 变量提升 var 声明的变量会变量提升
/**
 * 1: var foo = undefined
 * 2: foo = f1
 * 3: 执行foo，输出结果
 * 4：foo = f2
 * 5: 执行foo，输出结果
 */
// f1
var foo = function () {
  console.log('foo');
};
foo();
// f2
var foo = function () {
  console.log('foo1');
};
foo();

// 函数提升
/**
 * 1: 函数提升，f1会被f2覆盖掉
 * 2：执行foo 都是f2的结果
 */
// f1
function foo() {
  console.log('foo');
}
foo();
// f2
function foo() {
  console.log('foo1');
}
foo();
