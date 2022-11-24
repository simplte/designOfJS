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
// 5. 取类型数组中的第一个值
type First<T extends unknown[]> = T['length'] extends 0 ? never : T[0];
type test1 = [1, 2, 3, 4];
type res = First<test1>;

// 6. 获取元祖类型的长度
type Length<T extends unknown[]> = T['length'] extends 0 ? 0 : T['length'];
type reslen = Length<test1>;

// 7. 实现 exclude 排除
// T extends K  = T K中都有的不要  保留没有的
type MyExclude<T, K> = T extends K ? never : T;
