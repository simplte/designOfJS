// 1. HelloWorld
type HelloWorld = string;
// 2. Pick
type MyPick<T, K extends keyof T> = {
  [Z in K]: T[Z];
};
// 3. Readonly
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
// 4. 元祖转换为对象
/**
 * 元祖肯定是 一组字符串或者数字为值的数组 并且元祖是不可修改的数组
 * 首先要限制传入的类型为元祖类型
 * 然后循环元祖
 * T[number] 代表取数组中的值作为key
 */

type TupleToObject<T extends readonly (string | number)[]> = {
  [K in T[number]]: K;
};
